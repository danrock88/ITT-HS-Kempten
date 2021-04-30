<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
	<head>
		<title>
			<xsl:value-of select="pma_xml_export/database/@name"/>
		</title>
	</head>
	<body>
		<p>
			<h3>
				<xsl:value-of select="pma_xml_export/database/@name"/>
			</h3>
		</p>
		<table border="2">
			<tr>
				<td> <b>Produkt ID</b> </td>
				<td> <b>Bezeichnung</b> </td>
				<td> <b>Preis</b> </td>
				<td> <b>Haltbarkeit</b> </td>
			</tr>

			<!-- Tabelleninhalte -->


			
			<xsl:for-each select ="pma_xml_export/database/table">
			<tr>
				<td> <xsl:value-of select="column[@name='productID']"/> </td>
				<td> <xsl:value-of select="column[@name='name']"/> </td>
				<td> <xsl:value-of select="column[@name='price']"/> </td>
				<td> <xsl:value-of select="column[@name='durability']"/> </td>
			</tr>
			</xsl:for-each>
			

		</table>

		<br></br>

		<p><b> Produkte sortiert nach Produktnamen: </b></p>
		<xsl:for-each select ="pma_xml_export/database/table/column[@name='name']">
			<xsl:sort order="ascending"/>
				<xsl:value-of select="../column[@name='name']"/>
			<br></br>
		</xsl:for-each>

		<br></br>

		<p><b> Produkte sortiert nach Höchstpreis: </b></p>
		<table border="2">
		<xsl:for-each select ="pma_xml_export/database/table/column[@name='price']">
			<xsl:sort order="descending" data-type="number"/>
			<tr>

				<td><xsl:value-of select="../column[@name='name']"/></td>
				<td><xsl:value-of select="../column[@name='price']"/></td>
			</tr>
		</xsl:for-each>

		</table>

	</body>
</html>
</xsl:template>
</xsl:stylesheet>