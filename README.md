##
Running instruction : 
* docker run --name some-nginx2 -p 8080:80 -v ./:/usr/share/nginx/html:ro -d nginx - Build container (first timeo nly)
* docker start some-nginx2
* ngrok http http://localhost:8080
##
Sanitizing PDFs
* first we convert them to images with `gs -o output.pdf -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -r300 -dNOPAUSE -dBATCH -sDEVICE=pngalpha -sOutputFile=page-%03d.png input.pdf`
* then we combine the pages into a new pdf with `convert page-*.png output_image_pdf.pdf`
