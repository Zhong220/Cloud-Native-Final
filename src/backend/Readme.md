# Backend

## Installation & Run & Usage

### Installation and Configuration

- Use Ubuntu or powerShell
  1. Install Deno on Ubuntu and powershell if use Ubuntu
     ```bash
     # Ubuntu
     $ curl -fsSL https://deno.land/install.sh | sh
     $ deno -v

     # If use powerShell, only this step to install
     # powerShell
     $ winget install DenoLand.Deno
     $ deno -v
     ```
  2. Open VSCode and use shortcut [CTRL + SHIFT + p] and input
     `deno: Initialize Workspace Configuration`
  3. Put following content into `.vscode/setting.json`
     ```bash
      {
            "deno.enable": true,
            "deno.lint": true,
            "deno.unstable": true,
            "deno.enablePaths": [
                  "./Cloud-Native-Final/src/Backend"
            ],
            "editor.formatOnSave": true,
            "deno.config": "./Cloud-Native-Final/src/Backend/deno.jsonc",
      }

     ```
- Use mac
   ```bash
     # MacOS
     $ curl -fsSL https://deno.land/install.sh | sh
     $ deno -v
   ```
   

### Run

### Usage

### Reference

- [Deno Docs](https://docs.deno.com/)
