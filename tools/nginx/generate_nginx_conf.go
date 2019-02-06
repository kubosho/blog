package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"text/template"
)

func main() {
	outdir := os.Getenv("OUT_DIR")
	if outdir == "" {
		log.Fatalln("please specify $OUT_DIR")
	}

	port := os.Getenv("PORT")
	proxypass := os.Getenv("PROXY_PASS")
	wp := os.Getenv("NGINX_WORKERS")

	conf := config{
		Port:            port,
		ProxyPass:       proxypass,
		WorkerProcesses: wp,
	}

	if _, err := os.Stat(outdir); os.IsNotExist(err) {
		err := os.Mkdir(outdir, 0755)

		if err != nil {
			log.Fatalln(err.Error())
		}
	}

	filename := outdir + "/nginx.conf"
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatalln(err.Error())
	}

	fmt.Printf("=== generate-nginx-conf ===\n"+
		"data: %+v\n"+
		"generated filename: %v\n"+
		"cwd: %v\n"+
		"=================\n", conf, filename, cwd)

	tpl := template.Must(template.ParseFiles("./tools/nginx/tmpl_nginx.conf"))
	f, err := os.Create(filename)
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer f.Close()

	w := bufio.NewWriter(f)
	if err := tpl.Execute(w, conf); err != nil {
		log.Fatalln(err.Error())
	}

	if err := w.Flush(); err != nil {
		log.Fatalln(err.Error())
	}

	fmt.Println("generate nginx.conf completed")
}

type config struct {
	Port            string
	ProxyPass       string
	WorkerProcesses string
}
