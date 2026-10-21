export const PRELUDE = String.raw`
import ast
import builtins
import inspect
import linecache
import sys
import traceback

_FILENAME = "<exec>"

def _calls(node, names):
    return (
        isinstance(node, ast.Call)
        and isinstance(node.func, ast.Name)
        and node.func.id in names
    )

class _AwaitCalls(ast.NodeTransformer):
    def __init__(self, names):
        self.names = names

    def visit_Call(self, node):
        self.generic_visit(node)
        if _calls(node, self.names):
            return ast.copy_location(ast.Await(value=node), node)
        return node

class _MakeAsync(ast.NodeTransformer):
    def __init__(self, names):
        self.names = names

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        if node.name not in self.names:
            return node
        fields = {field: getattr(node, field) for field in node._fields}
        return ast.copy_location(ast.AsyncFunctionDef(**fields), node)

def _transform(tree):
    functions = [n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)]
    awaited = {"input"}
    changed = True
    while changed:
        changed = False
        for function in functions:
            if function.name in awaited:
                continue
            if any(_calls(n, awaited) for n in ast.walk(function)):
                awaited.add(function.name)
                changed = True
    if not any(_calls(n, awaited) for n in ast.walk(tree)):
        return tree
    tree = _MakeAsync(awaited - {"input"}).visit(tree)
    tree = _AwaitCalls(awaited).visit(tree)
    return ast.fix_missing_locations(tree)

async def _input(prompt=""):
    sys.stdout.flush()
    value = await __tpp_read_line(str(prompt))
    return str(value)

def _print_error(error, namespace):
    tb = error.__traceback__
    while tb is not None and tb.tb_frame.f_globals is not namespace:
        tb = tb.tb_next
    traceback.print_exception(type(error), error, tb)

async def __tpp_run(source):
    linecache.cache[_FILENAME] = (len(source), None, source.splitlines(True), _FILENAME)
    namespace = {"__name__": "__main__", "__builtins__": builtins, "input": _input}
    try:
        tree = ast.parse(source, _FILENAME)
        code = compile(
            _transform(tree), _FILENAME, "exec", flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT
        )
    except SyntaxError as error:
        traceback.print_exception(type(error), error, None)
        return
    try:
        result = eval(code, namespace)
        if inspect.iscoroutine(result):
            await result
    except SystemExit:
        pass
    except BaseException as error:
        _print_error(error, namespace)
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
`;
