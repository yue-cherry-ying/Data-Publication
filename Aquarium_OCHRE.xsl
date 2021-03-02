<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    <xsl:template match="/">
        <html>
            <head>
                <!-- Required meta tags -->
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                
                <!-- Connect Font Awesome CSS -->
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                                
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
                                        
                <!-- Connect to my own CSS -->
                <link rel="stylesheet" href="css/chalkboard.css"></link>
                                            
                <!-- JavaScript -->
                <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js " integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW " crossorigin="anonymous "></script>
                                            
                <!-- Connect to Google Fonts -->
                <link href="https://fonts.googleapis.com/css?family=Cardo:400,700|Oswald" rel="stylesheet"></link>
                                                
                <!-- Connect to my js file -->
                <script src="js/loadTextList.js"></script>
                                                
                <title>RSTI Texts</title>
                <link rel="icon" type="image/png" href="redbook.png"></link>
            </head>
            
            <body>
                <div class="container mt-3 mb-4">
                    <div class="container">
                        <table class="table table-striped order-table" if="ochreTable">
                            <thead class="thead-dark" id="ochreTableColumns">
                                <tr>
                                    <th style="text-align: left; width: 30%">Name</th>
                                    <th style="text-align: left; width: 30%">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="/ino:response/xq:result/ochre/set/items/text" xmlns:ino="http://namespaces.softwareag.com/tamino/response2" xmlns:xq="http://namespaces.softwareag.com/tamino/XQuery/result">
                                    <tr>
                                        <td>
                                            <xsl:value-of select="identification/label"/>
                                        </td>
                                        <td>
                                            <xsl:value-of select="description"/>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>