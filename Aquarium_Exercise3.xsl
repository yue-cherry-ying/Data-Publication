<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    <xsl:template match="text()"/>
    <xsl:template match="/">
        <html>
            <body>
                <xsl:apply-templates/> 
            </body>
        </html>
    </xsl:template>
    <xsl:template match="tank">
        <xsl:for-each select="supervisors">
            <xsl:sort select="supervisors/supervisor/shift" order="ascending"/>
            <xsl:for-each select="supervisor">
                <xsl:if test="shift = 'First' or shift = 'Second'">
                    <xsl:value-of select="lastName"/><xsl:text>: </xsl:text>
                    <xsl:value-of select="shift"/><br/>
                </xsl:if>
            </xsl:for-each>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>