import React, { useState } from "react";
import AddLocationForm from "./utilPages/AddLocationForm";
import Map from "./utilPages/map";

const ParentComponent = () => {
  const [mapKey, setMapKey] = useState(0);

  const handleLocationAdded = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <AddLocationForm onLocationAdded={handleLocationAdded} />
      <Map key={mapKey} />
    </div>
  );
};

export default ParentComponent;
