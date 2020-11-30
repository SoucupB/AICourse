languagePluginLoader.then(() => {
  function pushCode(line) {
    handleResult(c.push(line))
  }

  var term = $('body').terminal(
    pushCode,
    {
      greetings: "Welcome to the Pyodide terminal emulator 🐍",
      prompt: "[[;red;]>>> ]"
    }
  );

  window.term = term;
  pyodide.runPython(`
    import io, code, sys
    from js import term, pyodide

    class Console(code.InteractiveConsole):
        def runcode(self, code):
            sys.stdout = io.StringIO()
            sys.stderr = io.StringIO()
            term.runPython("\\n".join(self.buffer))
    _c = Console(locals=globals())
  `)

  var c = pyodide.pyimport('_c')

  function handleResult(result) {
    if (result) {
      term.set_prompt('[[;gray;]... ]')
    } else {
      term.set_prompt('[[;red;]>>> ]')
      var stderr = pyodide.runPython("sys.stderr.getvalue()").trim()
      if (stderr) {
        term.echo(`[[;red;]${stderr}]`)
      } else {
        var stdout = pyodide.runPython("sys.stdout.getvalue()")
        if (stdout) {
          console.log(stdout.trim());
          term.echo(stdout.trim())
        }
      }
    }
  }

  term.runPython = function(code) {
    pyodide.runPythonAsync(code).then(
      term.handlePythonResult, term.handlePythonError
    )
  }

  term.handlePythonResult = function(result) {
    if (result === undefined) {
      console.log("MEE");
      return
    } else if (result['_repr_html_'] !== undefined) {
     // console.log("MEE");
      term.echo(result['_repr_html_'], {raw: true})
    } else {
     // console.log("MEE");
      term.echo(result.toString())
    }
   // console.log("MEE");
  }

  term.handlePythonError = function(result) {
    term.error(result.toString())
  }
});