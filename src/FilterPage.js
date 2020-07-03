import React, {
  Fragment,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import {
  InboxOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Upload, Button, Row, Col, Space, Popover } from "antd";
import Filter from "./Filter";
import { AppContext } from "./App";
import defaultImage from "./default.jpg";
import FilterSider from "./FilterSider";
import { ORIGINAL, ShaderList } from "./Shaders";

const MAX_WIDTH = 560;
const MAX_HEIGHT = 420;

export default function FilterPage() {
  const {
    rawImage,
    setRawImage,
    width,
    setWidth,
    height,
    setHeight,
    shaderIndex,
  } = useContext(AppContext);

  const [pixelRatio, setPixelRatio] = useState(1);
  const filterRef = useRef();

  useEffect(() => {
    handleImageLoaded(defaultImage);
  }, []);

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
        <Row justify="center" gutter={32}>
          <Col>
            <Filter
              width={width / pixelRatio}
              height={height / pixelRatio}
              pixelRatio={pixelRatio}
              shader={ORIGINAL}
              ref={filterRef}
            />
          </Col>
          <Popover
            content={
              <p>
                shader porting from
                <Button
                  type="link"
                  onClick={() => window.open(ShaderList[shaderIndex].link)}
                >
                  {ShaderList[shaderIndex].reference}
                </Button>
              </p>
            }
            title={ShaderList[shaderIndex].name}
            placement="bottomRight"
            mouseEnterDelay={ShaderList[shaderIndex].reference ? 0.1 : 600}
          >
            <Col>
              <Filter
                width={width / pixelRatio}
                height={height / pixelRatio}
                pixelRatio={pixelRatio}
                shader={ShaderList[shaderIndex].shader}
                ref={filterRef}
              />
            </Col>
          </Popover>
        </Row>
        <Row
          justify="center"
          style={{
            padding: "20px 20px",
          }}
        >
          <FilterSider />
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
