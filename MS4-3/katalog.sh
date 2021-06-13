# Daten aus der Datenbank holen

mysqldump --xml -u inttentwickler -pITT11pra! -h 127.0.0.1 Allgold > dbkatalog.xml

# XSL Transformation durchführen 
java -cp /home/inttentwickler/Downloads/saxon9he.jar net.sf.saxon.Transform -o:dbkatalog.fo dbkatalog.xml katalog.xsl

# FO-Transformation durchführen
fop dbkatalog.fo dbkatalog.pdf

#Datei anzeigen
xdg-open dbkatalog.pdf