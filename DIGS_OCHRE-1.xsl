<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" 
    xmlns:ino="http://namespaces.softwareag.com/tamino/response2"
    xmlns:xql="http://metalab.unc.edu/xql"
    xmlns:xq="http://namespaces.softwareag.com/tamino/XQuery/result"
    xmlns:a="http://www.w3.org/1999/xhtml">
    <xsl:output method="html" version="5.0" encoding="UTF-8"/>

    <!-- Strip extra white space everywhere. -->
    <xsl:strip-space elements="*"/>
    
    <xsl:template match="/">
        <!--<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html&gt;</xsl:text>-->
        <!--the output method ("html") and the previous !DOCTYPE line render HTML5 (xmlns is optional on html tag) -->
        <html>
            <head>
                <meta charset="UTF-8"/>
                <!--THESE VARIABLES AND PARAMS ARE USED BY THE GOOGLE MAPS JS-->
                <xsl:variable name="lat" select="number(//coordinates/@latitude)"/>
                <xsl:variable name="lng" select="number(//coordinates/@longitude)"/>
                <xsl:variable name="itemName"
                    select="string(//ochre/spatialUnit|person/identification/label)"/>
                <param id="lat" value="{$lat}"/>
                <param id="lng" value="{$lng}"/>
                <param id="itemName" value="{$itemName}"/>
                
                <!--If the set is published from spec, then use this JS for table filtering.-->
                <xsl:if test="/ino:response/xq:result/ochre/set[@type = 'publishedFromSpec']">
                    <script src="http://ochre.lib.uchicago.edu/ochre/ochreSet.js"/>
                </xsl:if>
                <xsl:if test="//coordinates">
                    <!--INLINE JAVASCRIPT FOR THE GOOGLE MAP-->
                    <xsl:text disable-output-escaping="yes">
<![CDATA[
<script type="text/javascript" language="javascript" class="init">
	  var map;
      function initMap() {
        var itemTitle = {itemName: String(document.getElementById("itemName").value)};
		var myLatLng = {lat: Number(document.getElementById("lat").value), lng: Number(document.getElementById("lng").value)};
		var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: myLatLng
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: itemTitle.itemName
        });
      }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB-ZJuryRRmMubzIUAd1QlGo9b-PDj-TR4&callback=initMap" type="text/javascript">
</script>
]]>
</xsl:text>
                </xsl:if>
                <link rel="stylesheet" href="http://ochre.lib.uchicago.edu/ochre/ochreDNF.css"/>
                <link rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"/>
                <title>OCHRE publications</title>
            </head>
            <body class="pt-4">
                <!-- BODY INFORMATION NOT IN A SPECIFIC TEMPLATE, MUST APPLY TO ALL dB OBJECTS -->
                <div class="container-fluid">
                    <xsl:apply-templates/>
                </div>
                
                <!--PUBLICATION DATE AND LICENSE FOOTER-->
                <div class="footer" id="footer">
                    <hr/>
                    <div class="container-fluid">
                        <xsl:if test="//ochre">
                            <xsl:text>Last published: </xsl:text>
                            <xsl:value-of select="substring-before(//ochre/@publicationDateTime, 'T')"/>
                        </xsl:if>
                    </div>
                    <div class="container-fluid">
                        <xsl:if test="//availability">
                            <xsl:if test="//project/identification/label">
                                <xsl:text>Content made available under </xsl:text>
                                <a id="footerLink" href="{//availability/license/@target}">
                                    <xsl:value-of select="//availability/license/text()"/>
                                </a>
                                <xsl:if test="//project/identification/website">
                                    <xsl:text> by </xsl:text>
                                    <xsl:variable name="projWeb"
                                        select="//project/identification/website"/>
                                    <a id="footerLink" href="{$projWeb}">
                                        <xsl:value-of select="//project/identification/label"/>
                                    </a>
                                </xsl:if>
                                <xsl:text> via </xsl:text>
                                <a id="footerLink" href="http://ochre.uchicago.edu">OCHRE</a>
                                <br/>
                            </xsl:if>
                        </xsl:if>
                    </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"/>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"/>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="text()"> </xsl:template>
    
    <xsl:template match="spatialUnit">
        <div class="container-fluid">
            <div class="row h4">
                <!-- Choose what to display as a header, either the project website or name. -->
                <xsl:choose>
                    <xsl:when test="//website">
                        <xsl:variable name="projWeb" select="//project/identification/website"/>
                        <a id="noPaddingLink" href="{$projWeb}">
                            <xsl:value-of select="//project/identification/label"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        <div>
                            <xsl:value-of select="//metadata/description"/>
                        </div>
                    </xsl:otherwise>
                </xsl:choose>
            </div>
            <!-- The breadcrumbs menu -->
            <xsl:for-each select="context/context">
                <div class="row ml-5">
                    <xsl:for-each select="spatialUnit[@n &lt; '0'] | tree[@n &lt; '0']">
                        <xsl:sort select="@n * -1" data-type="number" order="descending"/>
                        <a id="noPaddingLink"
                            href="http://pi.lib.uchicago.edu/1001/org/ochre/{@uuid}">
                            <xsl:value-of select="."/>
                        </a>
                        <xsl:text>&#xA0;&gt;&#xA0;</xsl:text>
                    </xsl:for-each>
                </div>
            </xsl:for-each>
            
            <xsl:for-each select="//spatialUnit[@n = '0']">
                <xsl:if test="identification">
                    <div class="row py-1 mt-4">
                        <h1>
                            <xsl:apply-templates select="identification"/>
                        </h1>
                    </div>
                </xsl:if>
                <xsl:if test="identification/alias">
                    <div class="row py-3">
                        <xsl:apply-templates select="identification/alias"/>
                    </div>
                </xsl:if>
                <!--<xsl:if test="citedBibliography">
                    <div class="row">
                        <xsl:apply-templates select="citedBibliography"/>
                    </div>
                </xsl:if>-->
                <xsl:if test="description">
                    <div class="row py-2">Description:&#xA0;<xsl:value-of select="description"/></div>
                </xsl:if>
                <xsl:choose>
                    <xsl:when test="coordinates/@latitude">
                        <div class="row">
                            <div class="col-6">
                                <xsl:apply-templates select="observations"/>
                            </div>
                            <div class="col-6">
                                <xsl:apply-templates select="coordinates"/>
                            </div>
                        </div>
                    </xsl:when>
                    <xsl:otherwise>
                        <div class="row">
                            <xsl:apply-templates select="observations"/>
                        </div>
                    </xsl:otherwise>
                </xsl:choose>
                
                <div class="row">
                    <xsl:apply-templates select="reverseLinks"/>
                </div>
                
                <xsl:apply-templates select="context"/>
                
            </xsl:for-each>
            
        </div>
    </xsl:template>
    
    <xsl:template match="resource">
        <div class="container-fluid">
            <div class="row">
                <h1>
                    <xsl:apply-templates select="identification"/>
                </h1>
            </div>
            <xsl:if test="creators/creator">
                <div class="row">
                    <h4>
                        <xsl:text>Creator: </xsl:text>
                        <xsl:value-of select="creators/creator"/>
                    </h4>
                </div>
            </xsl:if>
            <div class="row">
                <h2>
                    <xsl:value-of select="description"/>
                </h2>
            </div>
            
            <div class="row">
                <xsl:if test="//@publicationDateTime">
                    <xsl:variable name="uuid" select="@uuid"/>
                    <xsl:choose>
                        <xsl:when test="@type = 'image'">
                            <div class="col-8">
                                <a id="noPaddingLink"
                                    href="http://ochre.lib.uchicago.edu/ochre?uuid={$uuid}&amp;image">
                                    <img width="100%"
                                        src="http://ochre.lib.uchicago.edu/ochre?uuid={$uuid}&amp;preview"
                                    />
                                </a>
                            </div>
                        </xsl:when>
                        <xsl:when test="@type = 'video'">
                            <div class="col-8">
                                <video width="100%" height="500px" controls="">
                                    <source
                                        src="http://ochre.lib.uchicago.edu/ochre?uuid={$uuid}&amp;load"
                                        type="video/mp4"/>
                                </video>
                            </div>
                        </xsl:when>
                        <xsl:when test="@type = 'externalDocument'">
                            <div class="col-8" style="height: 80vh;">
                                <iframe
                                    src="http://pi.lib.uchicago.edu/1001/org/ochre/{$uuid}&amp;pdf"
                                    width="100%" height="100%"/>
                                <!--previous/alternate approach <embed src="http://ochre.lib.uchicago.edu/ochre/ochre_SRS.php?uuid={$uuid}&amp;pdf"
						type="application/pdf" width="100%" height="100%"/>-->
                            </div>
                        </xsl:when>
                        <xsl:when test="@type = 'audio'">
                            <div class="col-8">
                                <audio controls="">
                                    <source
                                        src="http://pi.lib.uchicago.edu/1001/org/ochre/{$uuid}&amp;image"
                                        type="audio/mpeg"/>
                                </audio>
                            </div>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>Failed to load resource.</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:if>
                <div class="col-4">
                    <xsl:apply-templates select="properties/property"/>
                </div>
            </div>
            <xsl:apply-templates select="notes"/>
            <xsl:apply-templates select="reverseLinks"/>
        </div>
    </xsl:template>
    
    <xsl:template match="identification">
        <xsl:value-of select="label/text()"/>
    </xsl:template>
    
    <xsl:template match="alias">
        <xsl:for-each select=".">
            <xsl:value-of select="."/>
        </xsl:for-each>
        <xsl:if test="not(position() = last())">
            <xsl:text>, </xsl:text>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="observations">
        <xsl:for-each select="observation">
            <div>
                <p class="subtitle">
                    <xsl:if test="@observationNo">Observation:&#xA0;<xsl:value-of
                        select="@observationNo"/>&#xA0;</xsl:if>
                </p>
                <p>
                    <xsl:if test=".//observers">
                        <xsl:text>(</xsl:text>
                        <!--FOR LOOP TO HANDLE MULTIPLE OBSERVERS ON ONE OBSERVATION-->
                        <xsl:for-each select="observers/observer">
                            <xsl:value-of select="text()"/>
                            <xsl:if test="../../@date">
                                <xsl:text>:&#xA0;</xsl:text>
                                <xsl:value-of select="../../@date"/>
                            </xsl:if>
                            <!--CONDITIONAL COMMA FOR A LIST-->
                            <xsl:if test="not(position() = last())">
                                <xsl:text>, </xsl:text>
                            </xsl:if>
                        </xsl:for-each>
                        <xsl:text>)</xsl:text>
                    </xsl:if>
                </p>
                <xsl:if test="periods/period/identification/label">Period(s):&#xA0;</xsl:if>
                <xsl:value-of select="periods/period/identification/label"/>
                <xsl:apply-templates select="properties/property"/>
                <xsl:apply-templates select="notes"/>
                <xsl:apply-templates select="periods"/>
                <xsl:apply-templates select="links"/>
            </div>
        </xsl:for-each>
    </xsl:template>
    
    <xsl:template match="coordinates">
        <div id="map"/>
        <h5>Coordinates</h5>
        <p>
            <xsl:text>Lat: </xsl:text>
            <xsl:value-of select="@latitude"/>
            <xsl:text>, Lon:</xsl:text>
            <xsl:value-of select="@longitude"/>
        </p>
        <br/>
    </xsl:template>
    
    <xsl:template match="reverseLinks">
        <xsl:if test="*/@uuid">
            <h5>Linked items</h5>
            <xsl:for-each select="*">
                <xsl:value-of select="@label"/>
                <!--<xsl:text> of </xsl:text>
				<xsl:value-of select="name(.)"/>
				<xsl:text>: </xsl:text>-->
                <a id="noPaddingLink" href="http://pi.lib.uchicago.edu/1001/org/ochre/{@uuid}">
                    <xsl:value-of select="text()"/> 
                </a> (<xsl:value-of select="name(.)"/>)
                <br/>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="context">
        <xsl:if test="../spatialUnit">
            <div class="row">
                <h3>Sub-items</h3>
            </div>
        </xsl:if>
        <xsl:choose>
            <!-- Scenario: only one context for spatialUnit -->
            <xsl:when test="count(context) = 1">
                <xsl:for-each select="../spatialUnit">
                    <xsl:call-template name="sUnitLinks"/>
                </xsl:for-each>
            </xsl:when>
            <!-- Scenarios for multiple contexts -->
            <xsl:when test="count(context) &gt; 1">
                <!-- Get the value of the first uuidContext attribute -->
                <xsl:variable name="checkerUUID" select="../spatialUnit/@uuidContext[1]"/>
                <!-- Sub-items all fall in the same context -->
                <xsl:if
                    test="count(../spatialUnit[@uuidContext = string($checkerUUID)]) = count(../spatialUnit/@uuidContext)">
                    <xsl:for-each select="../spatialUnit">
                        <xsl:call-template name="sUnitLinks"/>
                    </xsl:for-each>
                </xsl:if>
                <!-- Sub-items fall into different contexts -->
                <xsl:if
                    test="count(../spatialUnit[@uuidContext = string($checkerUUID)]) != count(../spatialUnit/@uuidContext)">
                    <xsl:for-each select="context">
                        <xsl:variable name="treeUUID" select="tree/@uuid"/>
                        <p>
                            <xsl:value-of select="tree"/>
                        </p>
                        <xsl:for-each select="../../spatialUnit[@uuidContext = string($treeUUID)]">
                            <xsl:call-template name="sUnitLinks"/>
                        </xsl:for-each>
                    </xsl:for-each>
                </xsl:if>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>THIS BRANCH SHOULD NEVER BE REACHED.</xsl:text>
                <xsl:for-each select="context">
                    <xsl:value-of select="tree"/>
                    <xsl:call-template name="sUnitLinks"/>
                </xsl:for-each>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="property">
        <ul>
            <li>
                <xsl:value-of select="label"/>
                <xsl:text>:</xsl:text>
                <xsl:text>&#xA0;</xsl:text>
                <xsl:choose>
                    <xsl:when test="@uuid &#61; '1db231a7-a055-d5c6-08a8-b06022c8daec'">
                        <!--Associated text-->
                        <a href="http://pi.lib.uchicago.edu/1001/org/ochre/{value/@uuid}">
                            <xsl:value-of select="value"/>
                        </a>
                    </xsl:when>
                    <xsl:when test="value/@LOD">
                        <a href="{value/@LOD}">
                            <xsl:value-of select="value"/>
                        </a>
                    </xsl:when>
                    <xsl:otherwise>
                        
                        <xsl:if test="value/@type = 'link'">
                            <a href="http://pi.lib.uchicago.edu/1001/org/ochre/{value/@uuid}">
                                <xsl:value-of select="value"/>
                            </a>
                            <xsl:if test="@isUncertain">
                                <xsl:text>?</xsl:text>
                            </xsl:if>
                        </xsl:if>
                        <xsl:if test="not(value/@type = 'link')">
                            <xsl:value-of select="value"/>
                            <xsl:if test="@isUncertain">
                                <xsl:text>?</xsl:text>
                            </xsl:if>
                            <xsl:if test="comment">
                                <xsl:text>~</xsl:text>
                            </xsl:if>
                            <xsl:value-of select="comment"/>
                        </xsl:if>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:apply-templates select="property"/>
            </li>
        </ul>
    </xsl:template>
    
    <xsl:template match="notes">
        <xsl:if test="note">
            <xsl:for-each select="note">
                <xsl:if test="@title">
                    <h5>
                        <xsl:value-of select="@title"/>
                    </h5>
                </xsl:if>
                <xsl:if test="authors">
                    <xsl:text>(</xsl:text>
                    <xsl:value-of select="authors/author"/>
                    <xsl:text>)</xsl:text>
                </xsl:if>
                <xsl:if test="parent::notes/parent::section/identification/label/text()">
                    <p>
                        <xsl:value-of
                            select="parent::notes/parent::section/identification/label/text()"/>
                    </p>
                </xsl:if>
                
                <xsl:call-template name="LFsToBRs">
                    <xsl:with-param name="input" select="./text()"/>
                </xsl:call-template>
            </xsl:for-each>
            <br/>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="periods">
        <xsl:if test="period/text()">
            <h5>Attested periods</h5>
            <xsl:for-each select="period">
                <p>
                    <xsl:value-of select="text()"/>
                </p>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>
    
    <xsl:template match="links">
        <xsl:if test="resource">
            <h5>Resources<xsl:text> (</xsl:text><xsl:value-of select="count(resource)"
            /><xsl:text>)</xsl:text></h5>
            <p>
                <xsl:for-each select="resource">
                    <xsl:if test="@isPrimary">
                        <xsl:text>Primary Image</xsl:text>
                        <br/>
                        <!--NOTE: the API call must come from the same header as the current page, i.e. ochre.lib etc. not pi.lib-->
                        <xsl:variable name="docVar"
                            select="concat(string('http://ochre.lib.uchicago.edu/ochre?uuid='), string(@uuid))"/>
                        <xsl:variable name="resImg"
                            select="concat(string($docVar), string('&amp;preview'))"/>
                        <img src="{$resImg}" width="20%" height="auto"/>
                        <br/>
                    </xsl:if>
                    <a href="http://pi.lib.uchicago.edu/1001/org/ochre/{@uuid}" target="_blank">
                        <xsl:value-of select="."/>
                        <xsl:if test="@type">
                            <xsl:text> (</xsl:text>
                            <xsl:value-of select="@type"/>
                            <xsl:text>)</xsl:text>
                        </xsl:if>
                    </a>
                    <xsl:text>  </xsl:text>
                    <i class="fas fa-external-link-alt"/>
                    <br/>
                </xsl:for-each>
            </p>
        </xsl:if>
    </xsl:template>
    
    <!-- SPATIAL UNIT SUB-ITEMS LINKS LIST -->
    <!-- This template creates a links list of sub-items. -->
    <xsl:template name="sUnitLinks">
        <xsl:variable name="uuid" select="@uuid"/>
        <p>
            <a id="noPaddingLink" href="http://pi.lib.uchicago.edu/1001/org/ochre/{$uuid}">
                <xsl:value-of select="identification/label"/>
            </a>
            <xsl:if test="description">
                <xsl:text> </xsl:text>
                <xsl:value-of select="description"/>
            </xsl:if>
            <xsl:if
                test="observations/observation/properties//property[label = 'Location or object type']/value">
                <xsl:text> (</xsl:text>
                <xsl:value-of
                    select="observations/observation/properties//property[label = 'Location or object type']/value"/>
                <xsl:text>)</xsl:text>
            </xsl:if>
        </p>
    </xsl:template>
    
    <!--THE FOLLOWING TEMPLATE CONVERTS LF STYLE LINE BREAKS TO HTML BR STYLE LINE BREAKS-->
    <!--CALL IT WHERE NECESSARY; CF. THE NOTES TEMPLATE ABOVE.-->
    <xsl:template name="LFsToBRs">
        <xsl:param name="input"/>
        <xsl:choose>
            <xsl:when test="contains($input, '&#xA;')">
                <p>
                    <xsl:value-of select="substring-before($input, '&#xA;')"/>
                </p>
                <xsl:call-template name="LFsToBRs">
                    <xsl:with-param name="input" select="substring-after($input, '&#xA;')"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <p>
                    <xsl:value-of select="$input"/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>
