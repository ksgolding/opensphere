goog.provide('plugin.file.kml.KMLModelParser');

goog.require('ol.geom.Point');

/**
 * Constructor.
 * @constructor
 */
plugin.file.kml.KMLModelParser = function() {};

/**
 * Parses a KML model element that may be contained in a placemark element.
 *
 * @param {Element} el A placemark xml element.
 * @param {Object} object The object to add the model information to.
 */
plugin.file.kml.KMLModelParser.prototype.parseModel = function(el, object) {
  for (let i = el.children.length - 1; i >= 0; i--) {
    if (el.children[i].localName == 'Model') {
      const modelElement = el.children[i];
      const modelObject = {};
      for (let j = 0; j < modelElement.children.length; j++) {
        if (modelElement.children[j].localName == 'Location') {
          this.parseLocation(modelElement.children[j], object);
        } else if (modelElement.children[j].localName == 'Orientation') {
          this.parseOrientation(modelElement.children[j], modelObject);
        } else if (modelElement.children[j].localName == 'Scale') {
          this.parseScale(modelElement.children[j], modelObject);
        } else if (modelElement.children[j].localName == 'altitudeMode') {
          this.parseAltMode(modelElement.children[j], modelObject);
        } else if (modelElement.children[j].localName == 'Link') {
          this.parseLink(el, modelElement.children[j], modelObject);
        }
      }

      const keys = Object.keys(el.assetMap);
      const imagesObject = {};
      for (let k = 0; k < keys.length; k++) {
        const key = keys[k];
        if (!key.endsWith('.dae')) {
          imagesObject[key] = el.assetMap[key];
        }
      }

      modelObject['Images'] = imagesObject;
      object['Model'] = modelObject;
      break;
    }
  }
};

/**
 * Parses the alitude mode element of the model.
 *
 * @param {Element} el A model xml element.
 * @param {Object} object The object to add the link information to.
 * @private
 */
plugin.file.kml.KMLModelParser.prototype.parseAltMode = function(el, object) {
  const altModeText = el.textContent;

  let altMode = os.webgl.AltitudeMode.CLAMP_TO_GROUND;
  if (altModeText == 'relativeToGround') {
    altMode = os.webgl.AltitudeMode.RELATIVE_TO_GROUND;
  }

  object['altitudeMode'] = altMode;
};

/**
 * Parses the link element of the model.
 *
 * @param {Element} placemark The placemark element
 * @param {Element} el A model xml element.
 * @param {Object} object The object to add the link information to.
 * @private
 */
plugin.file.kml.KMLModelParser.prototype.parseLink = function(placemark, el, object) {
  const colladaFileName = el.children[0].textContent;
  const colladaData = placemark.assetMap[colladaFileName];
  object['collada'] = colladaData;
};

/**
 * Parses the location element of the model.
 *
 * @param {Element} el A model xml element.
 * @param {Object} object The object to add the point geometry to.
 * @private
 */
plugin.file.kml.KMLModelParser.prototype.parseLocation = function(el, object) {
  let lat;
  let lon;
  let alt;

  for (let i = 0; i < el.children.length; i++) {
    if (el.children[i].localName == 'longitude') {
      lon = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'latitude') {
      lat = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'altitude') {
      alt = parseFloat(el.children[i].textContent);
    }
  }

  object['geometry'] = new ol.geom.Point([lon, lat, alt]);
};

/**
 * Parses the orientation element of the model.
 *
 * @param {Element} el A model xml element.
 * @param {Object} object The object to add the orientation information to.
 * @private
 */
plugin.file.kml.KMLModelParser.prototype.parseOrientation = function(el, object) {
  for (let i = 0; i < el.children.length; i++) {
    if (el.children[i].localName == 'heading') {
      object['heading'] = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'tilt') {
      object['tilt'] = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'roll') {
      object['roll'] = parseFloat(el.children[i].textContent);
    }
  }
};

/**
 * Parses the scale element of the model.
 *
 * @param {Element} el A model xml element.
 * @param {Object} object The object to add the scale information to.
 * @private
 */
plugin.file.kml.KMLModelParser.prototype.parseScale = function(el, object) {
  for (let i = 0; i < el.children.length; i++) {
    if (el.children[i].localName == 'x') {
      object['scaleX'] = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'y') {
      object['scaleY'] = parseFloat(el.children[i].textContent);
    } else if (el.children[i].localName == 'z') {
      object['scaleZ'] = parseFloat(el.children[i].textContent);
    }
  }
};
