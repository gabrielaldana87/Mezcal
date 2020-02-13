const
  datamodel = require('../db/censusKeys.json'),
  educationKeys = require('../db/educationKeys.json'),
  amazonKeys = require('../db/limitedCensusKeys.json'),
  rawFile = require('../db/DP03_0062E&DP02_0067PE.json'),
  regions = require('../db/statesRegions.json'),
  mapFips = require('../db/usFipsPolygons.json'),
  nycTracts = require('../db/tracts_nyc.json'),
  statesShape = require('../db/usStatesPolygons.json'),
  fs = require('fs'),
  _ = require('underscore'),
  inside = require('point-in-polygon'),
  Q = require('q')
  ;
const getRawEducationIncome = () => {
  let
    deferred = Q.defer()
    ;
  deferred.resolve(rawFile);
  return deferred.promise;
}
;
const readCountiesShapefile = () => {
 let
   deferred = Q.defer()
  ;
  deferred.resolve(mapFips);
  return deferred.promise;
}
;
const readStatesShapefile = () => {
  let
    deferred = Q.defer()
    ;
  deferred.resolve(statesShape);
  return deferred.promise;
}
;
const extractCountyName = file => {
  let
    deferred = Q.defer(),
    merge = mapFips.objects.counties.geometries.map(r => {
      return Object.assign({}, r, _.find(file, m => {
       if(r.id === m.id) return m;
      }));
    });
  deferred.resolve(merge);
  return deferred.promise;
}
;
const getRegions = results => {
  let
    deferred = Q.defer(),
    attributes = regions.map( o => {
      return {id_state: o.id, state: o.state, region: o.region, color: o.color}
    }),
    merge = results.map(r => {
    return Object.assign({}, r, _.find(attributes, m => {
      if(r.id.substr(0,2) === m.id_state){
        return m;
      }
    }));
  });
  deferred.resolve(merge);
  return deferred.promise;
}
;
const readCensusFile = id => {
  let
    deferred = Q.defer()
    ;
  fs.readFile(`./db/measures/${id}.json`, (err, res) => {
    deferred.resolve(JSON.parse(res));
  });
  return deferred.promise;
}
;
exports.drawCountiesMap = (req, res) => {

  readCountiesShapefile()
    .then(results => {
      res.send(results);
    })
    .done();
}
;
exports.drawStatesMap = (req, res) => {

  readStatesShapefile()
    .then(results => {
      res.send(results);
    });
}
;
exports.extractKeys = (req, res) => res.send(datamodel)
;
exports.extractEduKeys = (req, res) => res.send(educationKeys)
;
exports.mergeRegionsById = (req,res) => {

  extractCountyName(rawFile)
    .then(results => {
      return getRegions(results);
    })
    .then(results => {
      res.send(results);
    })
    .done();
};

exports.mergeTwoCensusMeasures = (obj, res) => {

  let array;

  readCensusFile(obj.var1)
    .then( results => {
      array = results.map( e => {
        return { id: e.id, rate_one: e.rate }
      });
      return readCensusFile(obj.var2)
    })
    .then( results => {
      let
        rearrange = results.map( e => {
        return {id: e.id, rate_two: e.rate}
      });
      let merge = array.map(r => {
        return Object.assign({}, r, _.find(rearrange, o => {
          if (o.id === r.id) { return o.rate_two; }
        }))
      });
      return extractCountyName(merge)
    })
    .then( results => {
      return getRegions(results)
    })
    .then( results => {
      res.send(results);
    })
    .done();
};


const readTracts = () => {
  const
    deferred = Q.defer(),
    borough = val => { switch(val) {
      case '1' : return '061';
        break;
      case '5' : return '085';
        break;
      case '3': return '047';
        break;
      case '2': return '005';
        break;
      case '4': return '081';
        break;
      }
    }
    ;
  fs.readFile('./db/tracts_nyc.json', (err, res) => {
    let tracts = JSON.parse(res);
    fs.readFile('./db/subway_stations.json', (err, res) => {
      let stations = JSON.parse(res);
      stations.features.map(o => {
        let station = o.properties.name;
        tracts.features.map(e => {
          let neighborhood = e.properties.NTAName;
          let censustract = e.properties.CT2010;
          let polygon = e.geometry.coordinates;
          if(inside(o.geometry.coordinates, polygon[0]) === true){
            o.properties['neighborhood'] = neighborhood;
            o.properties['tract'] = censustract;
            o.properties['borough'] = borough(e.properties.BoroCode);
            let string = `{
            "neighborhood": "${neighborhood}", 
            "station": "${station}", 
            "tract": "${censustract}",
            "stationid": "${o.properties.objectid}",
            "line": "${o.properties.line}",
            "borough": "${borough(e.properties.BoroCode)}"}`;
          }
        });
      });
      return deferred.resolve(stations);
    });
  });
  return deferred.promise;
};


// readTracts().then(results => {
//   fs.readFile('./db/median_income_nyc_ct.json', (err, res) => {
//     let
//       parsed = JSON.parse(res),
//       dp03_0062e = parsed[0][0].toLowerCase(),
//       county = parsed[0][3],
//       tract = parsed[0][4]
//       ;
//     results.features.map(o => {
//       let
//         t = o.properties.tract,
//         borough = o.properties.borough
//         ;
//       parsed.map(k => {
//         if(t == k[4] && k[3] == borough) { o.properties[dp03_0062e] = k[0];}
//       });
//     });
//     fs.writeFile('./db/subway_stations_merged.json', JSON.stringify(results) , err => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//     });
//   });
// });