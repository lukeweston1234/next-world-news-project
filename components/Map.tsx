import React, { useEffect, useRef } from "react";
import type {
  Feature,
  FeatureCollection,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  GeoJsonGeometryTypes,
  GeoJsonTypes,
  GeometryObject,
} from "geojson";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ posts }: { posts: Array<any> }) => {
  const mapNode = useRef(null);
  useEffect(() => {
    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: posts.map((p) => {
        let tempCord = p.geo_json.geometry[0].coordinates;
        let feature: Feature = {
          type: "Feature",
          id: p.id,
          geometry: {
            type: "Point",
            coordinates: tempCord.map((t: String) => {
              return Number(t);
            }),
          },
          properties: {
            score: p.score,
          },
        };
        return feature;
      }),
    };
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;
    const map = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: "mapbox://styles/lukeweston1234/cl8xahj0f000a15p8qmo4grr5",
      center: [0, 20],
      zoom: 2,
    });
    map.on("load", () => {
      console.log(JSON.stringify(featureCollection));
      map.addSource("posts", {
        type: "geojson",
        data: featureCollection,
      });
      map.addLayer({
        id: "posts",
        source: "posts",
        type: "heatmap",
        paint: {
          "heatmap-weight": 0.8,
          "heatmap-opacity": 0.7,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255,205,178,0)",
            0.2,
            "rgba(255,180,162,0.8)",
            0.4,
            "rgba(229,152,155,0.8)",
            0.6,
            "rgba(181,131,141,0.8)",
            1,
            "rgba(109,104,117,0.8)",
          ],
        },
      });
    });
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
};

export default Map;
