import React, { Fragment, useState, useContext, useEffect } from "react";
import { Radio, Row, Col, Divider } from "antd";
import { AppContext } from "./App";
import { ShaderMap } from "./Shaders";
import Filter from "./Filter";

const MAX_WIDTH = 200;
const MAX_HEIGHT = 150;

export default function FilterSider() {
  const { width, height, setCurShader } = useContext(AppContext);
  const [pixelRatio, setPixelRatio] = useState(1);
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    setPixelRatio(Math.max(1, width / MAX_WIDTH, height / MAX_HEIGHT));
  }, [width, height]);

  function onChange(value) {
    setSelectedValue(value);
    setCurShader(Object.keys(ShaderMap)[value]);
  }

  return (
    <Row justify="center" align="middle" gutter={[32, 32]}>
      <Radio.Group
        onChange={(e) => onChange(e.target.value)}
        value={selectedValue}
      >
        {Object.keys(ShaderMap).map((shaderName, index) => {
          return (
            <Col key={index} onClick={() => onChange(index)} value={index}>
              <Row justify="center">
                <Filter
                  width={width / pixelRatio}
                  height={height / pixelRatio}
                  pixelRatio={pixelRatio}
                  shaderName={shaderName}
                />
              </Row>
              <Row justify="center">
                <Radio value={index}>{shaderName}</Radio>
              </Row>
            </Col>
          );
        })}
      </Radio.Group>
    </Row>
  );
}
