# Backend
## Go Installation Instructions
1. Download according to terminal, [here](https://go.dev/dl/) 
* Ubuntu
  
  1. move downloaded file into `/usr/local/`
        ```bash
        $ mv /YOUR/DOWNLOAD/PATH/go1.23.2.linux-amd64.tar.gz /usr/local/
        ```
  2. go `/usr/local/` and extract
        ```bash
        $ cd /usr/local/
        $ rm -rf /usr/local/go && tar -C /usr/local -xzf go1.23.2.linux-amd64.tar.gz
        $ export PATH=$PATH:/usr/local/go/bin

        # version check
        $ go version
        ```
  3. write path into `~/.bashrc`
        ```bash
        $ echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.bashrc
        ```
  4. `exit` your terminal and open new to check
        ```bash
        # exit
        $ exit

        # open new one
        $ go version
        ```
  5. test
        ```bash
        $ touch test.go

        # put following code into ./test.go
        ````
        ```go
        package main

        import "fmt"

        func main() {
            fmt.Println("Hello, World!")
        }
        ```
        ```bash
        # test
        $ go run test.go

        # should show
        Hello, World!
        ```
* windows
    
    2. Welcome replenish