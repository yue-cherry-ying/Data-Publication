<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    <xsl:template match="/">
        <html>
            <body>
                <xsl:for-each select="/aquarium/tank/fishInventory/fish">
                    <xsl:sort select="nickname"/>
                    <xsl:value-of select="nickname"/><xsl:text>: </xsl:text>
                    <xsl:value-of select="birthday"/><br/>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>