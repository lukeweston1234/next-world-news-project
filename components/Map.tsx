import React, { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
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
import Popup from "./Popup";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type MapProps = {
  posts: Array<any>;
};

const Map = (props: MapProps) => {
  const mapNode = useRef(null);
  const popupRef = useRef<mapboxgl.Popup>(
    new mapboxgl.Popup({
      closeButton: false,
    })
  );
  useEffect(() => {
    const featureCollection: FeatureCollection = {
      type: "FeatureCollection",
      features: props.posts.map((p) => {
        let feature: Feature = {
          type: "Feature",
          id: p.id,
          geometry: {
            type: "Point",
            coordinates: [p.long, p.lat],
          },
          properties: {
            name: p.name,
            posts: p.posts,
            postsWeight: p.posts.length,
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
          "heatmap-weight": {
            property: "postsWeight",
            type: "exponential",
            stops: [
              [1, 0.3],
              [10, 1],
            ],
          },
          "heatmap-opacity": 0.9,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255,205,178,0)",
            0.2,
            "rgba(239,216,239,1)",
            0.4,
            "rgba(218,177,218,1)",
            0.6,
            "rgba(192,124,173,1)",
            1,
            "rgba(147, 64, 110,1)",
          ],
        },
      });
      map.addLayer({
        id: "posts-circle",
        type: "circle",
        source: "posts",
        paint: {
          "circle-radius": 6,
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
        let posts = JSON.parse(e.features![0].properties!.posts);
        console.log(posts);
        for (let i in posts) {
          console.log(posts[i]);
        }
        const deleteNode = () => {
          popupRef.current.remove();
        };
        let popupNode = document.createElement("div");
        ReactDOM.render(
          <Popup deleteFunction={deleteNode} posts={posts} />,
          popupNode
        );
        popupRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      });
    });
    return () => {
      map.remove();
    };
  }, []);

  return <div className="w-screen h-screen p-0" ref={mapNode} />;
};

export default Map;
