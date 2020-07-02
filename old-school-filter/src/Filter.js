import React, {
  Fragment,
  useImperativeHandle,
  forwardRef,
  useState,
  useContext,
} from "react";
import { Node } from "gl-react";
import { Surface } from "gl-react-dom";
import { ShaderMap } from "./Shaders";
import { AppContext } from "./App";
var FileSaver = require("file-saver");

function Filter(props, ref) {
  const { rawImage } = useContext(AppContext);
  const [surface, setSurface] = useState(null);

  useImperativeHandle(ref, () => ({
    download: () => {
      const data = surface.captureAsDataURL("image/jpeg", 0.75);
      FileSaver.saveAs(data, "download.jpg");
    },
  }));

  return (
    <Fragment>
      <Surface
        width={props.width}
        height={props.height}
        ref={(r) => setSurface(r)}
        webglContextAttributes={{ preserveDrawingBuffer: true }}
        pixelRatio={props.pixelRatio}
      >
        <Node
          shader={ShaderMap[props.shaderName].shader}
          uniforms={{
            tex: rawImage,
            iTime: 1.0,
          }}
        />
      </Surface>
    </Fragment>
  );
}

export default forwardRef(Filter);
