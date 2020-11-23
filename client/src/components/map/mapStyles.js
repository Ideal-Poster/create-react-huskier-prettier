export default [
  // {
  //     "featureType": "poi",
  //     "elementType": "all",
  //      "stylers": [
  //     {
  //       "visibility": "off",
  //     },
  //   ],
  // },
  {
    featureType: "administrative.neighborhood",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#747474",
      },
      {
        lightness: "23",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f38eb0",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ced7db",
      },
    ],
  },
  // {
  //     "featureType": "poi.medical",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //         {
  //             "color": "#ffa5a8"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "poi.park",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //         {
  //             "color": "#c7e5c8"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "poi.place_of_worship",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //         {
  //             "color": "#d6cbc7"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "poi.school",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //         {
  //             "color": "#c4c9e8"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "poi.sports_complex",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //         {
  //             "color": "#b1eaf1"
  //         }
  //     ]
  // },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: "100",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        lightness: "100",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffd4a5",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffe9d2",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "3.00",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        weight: "0.30",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#747474",
      },
      {
        lightness: "36",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#e9e5dc",
      },
      {
        lightness: "30",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
      {
        lightness: "100",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#d2e7f7",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

// export default [
//     {
//       featureType: "all",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           saturation: 36,
//         },
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 40,
//         },
//       ],
//     },
//     {
//       featureType: "all",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           visibility: "on",
//         },
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 16,
//         },
//       ],
//     },
//     {
//       featureType: "all",
//       elementType: "labels.icon",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 20,
//         },
//       ],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry.stroke",
//       stylers: [
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 17,
//         },
//         {
//           weight: 1.2,
//         },
//       ],
//     },
//     {
//       featureType: "administrative",
//       elementType: "labels",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.country",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.country",
//       elementType: "geometry",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.country",
//       elementType: "labels.text",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.province",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.locality",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//         {
//           saturation: "-100",
//         },
//         {
//           lightness: "30",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.neighborhood",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "administrative.land_parcel",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "landscape",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//         {
//           gamma: "0.00",
//         },
//         {
//           lightness: "74",
//         },
//       ],
//     },
//     {
//       featureType: "landscape",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#34334f",
//         },
//         {
//           lightness: "-37",
//         },
//       ],
//     },
//     {
//       featureType: "landscape.man_made",
//       elementType: "all",
//       stylers: [
//         {
//           lightness: "3",
//         },
//       ],
//     },
//     {
//       featureType: "poi",
//       elementType: "all",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "poi",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 21,
//         },
//       ],
//     },
//     {
//       featureType: "road",
//       elementType: "geometry",
//       stylers: [
//         {
//           visibility: "simplified",
//         },
//       ],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry.fill",
//       stylers: [
//         {
//           color: "#2d2c45",
//         },
//         {
//           lightness: "0",
//         },
//       ],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry.stroke",
//       stylers: [
//         {
//           color: "#000000",
//         },
//         {
//           lightness: 29,
//         },
//         {
//           weight: 0.2,
//         },
//       ],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           color: "#7d7c9b",
//         },
//         {
//           lightness: "43",
//         },
//       ],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#2d2c45",
//         },
//         {
//           lightness: "1",
//         },
//       ],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "labels.text",
//       stylers: [
//         {
//           visibility: "on",
//         },
//       ],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           color: "#7d7c9b",
//         },
//       ],
//     },
//     {
//       featureType: "road.arterial",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//     {
//       featureType: "road.local",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#2d2c45",
//         },
//         {
//           lightness: "-1",
//         },
//         {
//           gamma: "1",
//         },
//       ],
//     },
//     {
//       featureType: "road.local",
//       elementType: "labels.text",
//       stylers: [
//         {
//           visibility: "on",
//         },
//         {
//           hue: "#ff0000",
//         },
//       ],
//     },
//     {
//       featureType: "road.local",
//       elementType: "labels.text.fill",
//       stylers: [
//         {
//           color: "#7d7c9b",
//         },
//         {
//           lightness: "-31",
//         },
//       ],
//     },
//     {
//       featureType: "transit",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#2d2c45",
//         },
//         {
//           lightness: "-36",
//         },
//       ],
//     },
//     {
//       featureType: "transit.station.airport",
//       elementType: "geometry.stroke",
//       stylers: [
//         {
//           visibility: "on",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "geometry",
//       stylers: [
//         {
//           color: "#2d2c45",
//         },
//         {
//           lightness: "0",
//         },
//         {
//           gamma: "1",
//         },
//       ],
//     },
//     {
//       featureType: "water",
//       elementType: "labels.text.stroke",
//       stylers: [
//         {
//           visibility: "off",
//         },
//       ],
//     },
//   ];
