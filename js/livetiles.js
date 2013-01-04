function UpdatePrimaryTile(tileMessage, imageUri, imageAlt) {
    var notifications = Windows.UI.Notifications;

    // Small Template
    var smallTemplate = notifications.TileTemplateType.tileSquareImage;
    var smallTileXml = notifications.TileUpdateManager.getTemplateContent(smallTemplate);

    var smallTileAttributes = smallTileXml.getElementsByTagName("image");
    smallTileAttributes[0].setAttribute("src", imageUri);
    smallTileAttributes[0].setAttribute("alt", imageAlt);

    //Wide Template
    var wideTemplate = notifications.TileTemplateType.tileWideSmallImageAndText03;
    var wideTileXml = notifications.TileUpdateManager.getTemplateContent(wideTemplate);

    var wideTileAttributes = wideTileXml.getElementsByTagName("image");
    var wideTileTextElements = wideTileXml.getElementsByTagName("text");

    wideTileAttributes[0].setAttribute("src", imageUri);
    wideTileTextElements[0].innerText = tileMessage;

    //Now we're going to add one of the tiles to the other tile creating one.
    var node = wideTileXml.importNode(smallTileXml.getElementsByTagName("binding").item(0), true);
    wideTileXml.getElementsByTagName("visual").item(0).appendChild(node);


    var tileNotification = new notifications.TileNotification(wideTileXml);
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
}
