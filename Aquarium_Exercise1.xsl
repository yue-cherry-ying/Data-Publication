<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    <xsl:template match="/">
        <html>
            <body>
                <h1>
                    <xsl:value-of select="/aquarium/tank[@n = '2']/tankName"/>
                </h1>
                <xsl:for-each select="/aquarium/tank[@n = '2']/supervisors/supervisor">
                    <xsl:value-of select="firstName"/><xsl:text> </xsl:text>
                    <xsl:value-of select="lastName"/><xsl:text>: </xsl:text>
                    <xsl:value-of select="shift"/><br/>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>