var pushCodeOuter = null;
var globals = null;

function executeCode() {
  pushCodeOuter('stdout_ = sys.stdout\n' +
                'var = ExClass()\n' +
                'sys.stdout = var')
  pushCodeOuter(document.getElementById('txtarea').value)
  pushCodeOuter('result = var.st\n' +
                'sys.stdout = stdout_')
  document.getElementById('output').innerHTML = globals.result
}
languagePluginLoader.then(() => {
  pushCodeOuter = pyodide.runPython;
  pushCodeOuter(
    'class ExClass:\n' +
    '   def __init__(self):\n' +
    '     self.st = ""\n' +
    '   def write(self, o):\n' +
    '     self.st += str(o)')
  globals = pyodide.globals
});