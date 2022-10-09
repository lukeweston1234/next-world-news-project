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

type MapProps = {
  posts: Array<any>;
  setCanShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Map = (props: MapProps) => {
  const mapNode = useRef(null);
  useEffect(() => {
    const mapHandler = () => {
      props.setCanShow(true);
    };

    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: props.posts.map((p) => {
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
            url: p.url,
            title: p.title,
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
      map.addSource("posts", {
        type: "geojson",
        data: featureCollection,
      });
      map.addLayer({
        id: "posts",
        source: "posts",
        type: "heatmap",
        paint: {
          "heatmap-radius": {
            base: 40,
            stops: [
              [2, 50],
              [8, 100],
            ],
          },
          "heatmap-weight": 0.8,
          "heatmap-opacity": 0.7,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255,205,178,0)",
            0.2,
            "rgba(239,216,239,0.8)",
            0.4,
            "rgba(218,177,218,0.8)",
            0.6,
            "rgba(192,124,173,0.8)",
            1,
            "rgba(147, 64, 110,0.8)",
          ],
        },
      });
      map.addLayer({
        id: "posts-circle",
        type: "circle",
        source: "posts",
        paint: {
          "circle-radius": {
            base: 10,
            stops: [
              [0, 4],
              [4, 20],
            ],
          },
          "circle-opacity": 0.8,
          "circle-color": "white",
        },
      });
      map.on("mouseenter", "posts-circle", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "posts-circle", function () {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "posts-circle", (e) => {
        mapHandler();
      });
    });
    return () => {
      map.remove();
    };
  }, [props.setCanShow]);

  return <div className="w-screen h-screen" ref={mapNode} />;
};

export default Map;
