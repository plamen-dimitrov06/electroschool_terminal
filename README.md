## Running instruction
* docker run --name some-nginx2 -p 8080:80 -v ./:/usr/share/nginx/html:ro -d nginx - Build container (first time only)
* docker start some-nginx2
* ngrok http http://localhost:8080

## Converting PDFs to PNGs
For Word documents: `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pngmono -r225 "-sOutputFile=page-%03d.png" -dDownScaleFactor=4 -dEncodeMonoImages=true -dMonoImageFilter=/CCITTFaxEncode .\input.pdf`

For colored images: `gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r225 "-sOutputFile=page-%03d.png" .\input.pdf`

## Important
After uploading and replacing the new pngs, also update the png pages count in the corresponding webpage file