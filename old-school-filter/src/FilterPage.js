import React, { Fragment, useState, useContext, useRef } from "react";
import {
  InboxOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Upload, Button, Row, Col, Space } from "antd";
import Filter from "./Filter";
import { AppContext } from "./App";
import defaultImage from "./default.jpg";

const MAX_WIDTH = 800;
const MAX_HEIGHT = 600;

export default function FilterPage() {
  const {
    rawImage,
    setRawImage,
    width,
    setWidth,
    height,
    setHeight,
    curShader,
  } = useContext(AppContext);

  const [pixelRatio, setPixelRatio] = useState(1);
  const filterRef = useRef();

  handleImageLoaded(defaultImage);

  function handleImageLoaded(base64) {
    const image = new Image();
    image.onload = () => {
      const ratio = Math.max(
        1,
        image.width / MAX_WIDTH,
        image.height / MAX_HEIGHT
      );
      setWidth(image.width);
      setHeight(image.height);
      setPixelRatio(ratio);
      setRawImage(base64);
    };
    image.src = base64;
  }

  function handleBeforeUpload(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      handleImageLoaded(e.target.result);
    };
    return false;
  }

  function removeImage() {
    setRawImage(null);
  }

  function renderBeforeUpload() {
    return (
      <Row justify="center" align="middle">
        <Col span={16}>
          <Upload.Dragger
            name="file"
            multiple={false}
            beforeUpload={handleBeforeUpload}
            height={500}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area</p>
            <p className="ant-upload-hint">
              Your files won't be uploaded to any servers, they will only be
              used locally.
            </p>
            <p className="ant-upload-hint">Enjoy.</p>
          </Upload.Dragger>
        </Col>
      </Row>
    );
  }

  function renderUploaded() {
    return (
      <Fragment>
        <Row justify="center">
          <Col>
            <Filter
              width={width / pixelRatio}
              height={height / pixelRatio}
              pixelRatio={pixelRatio}
              shaderName={curShader}
              ref={filterRef}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Space>
            <Button
              onClick={removeImage}
              type="primary"
              shape="round"
              size="large"
              icon={<DeleteOutlined />}
            >
              Remove
            </Button>
            <Button
              onClick={() => filterRef.current.download()}
              type="primary"
              shape="round"
              size="large"
              icon={<DownloadOutlined />}
            >
              Download
            </Button>
          </Space>
        </Row>
      </Fragment>
    );
  }

  return (
    <Fragment>{rawImage ? renderUploaded() : renderBeforeUpload()}</Fragment>
  );
}
