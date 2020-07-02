(this["webpackJsonpold-school-filter"]=this["webpackJsonpold-school-filter"]||[]).push([[0],{152:function(e,t,n){e.exports=n.p+"static/media/default.7d1f8fbc.jpg"},176:function(e,t,n){e.exports=n(326)},319:function(e,t,n){},326:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),l=n.n(c),o=n(22),i=n(334),u=n(335),s=n(336),m=n(332),f=n(333),d=n(330),v=n(327),h=n(113),g=n(33),x=n(151),p=n(85);function y(){var e=Object(p.a)(["\n        precision highp float;\n        uniform sampler2D tex;\n        uniform float iTime;\n        varying vec2 uv;\n        \n        highp float rand(vec2 co)\n        {\n            highp float a = 12.9898;\n            highp float b = 78.233;\n            highp float c = 43758.5453;\n            highp float dt= dot(co.xy ,vec2(a,b));\n            highp float sn= mod(dt,3.14);\n            return fract(sin(sn) * c);\n        }\n      \n        void main()\n        {\n            highp float magnitude = 0.000003;\n        \n            // Set up offset\n            vec2 offsetRedUV = uv;\n            offsetRedUV.x = uv.x + rand(vec2(iTime*0.03,uv.y*0.42)) * 0.001;\n            offsetRedUV.x += sin(rand(vec2(iTime*0.2, uv.y)))*magnitude;\n            \n            vec2 offsetGreenUV = uv;\n            offsetGreenUV.x = uv.x + rand(vec2(iTime*0.004,uv.y*0.002)) * 0.004;\n            offsetGreenUV.x += sin(iTime*9.0)*magnitude;\n            \n            vec2 offsetBlueUV = uv;\n            offsetBlueUV.x = uv.y;\n            \n            // Load Texture\n            float r = texture2D(tex, offsetRedUV).r;\n            float g = texture2D(tex, offsetGreenUV).g;\n            float b = texture2D(tex, uv).b;\n            \n            gl_FragColor = vec4(r, g, b, 1.0);\n        }\n    "]);return y=function(){return e},e}function b(){var e=Object(p.a)(["\n          precision mediump float;\n          uniform sampler2D tex;\n          uniform float iTime;\n          varying vec2 uv;\n  \n          void main()\n          {\n              vec3 oricol = texture2D( tex, uv ).xyz;\n              vec3 col;\n              float x =  sin(0.3*iTime+uv.y*21.0)*sin(0.7*iTime+uv.y*29.0)*sin(0.3+0.33*iTime+uv.y*31.0)*0.0017;\n  \n              col.r = texture2D(tex,vec2(x+uv.x+0.001,uv.y+0.001)).x+0.05;\n              col.g = texture2D(tex,vec2(x+uv.x+0.000,uv.y-0.002)).y+0.05;\n              col.b = texture2D(tex,vec2(x+uv.x-0.002,uv.y+0.000)).z+0.05;\n              col.r += 0.08*texture2D(tex,0.75*vec2(x+0.025, -0.027)+vec2(uv.x+0.001,uv.y+0.001)).x;\n              col.g += 0.05*texture2D(tex,0.75*vec2(x+-0.022, -0.02)+vec2(uv.x+0.000,uv.y-0.002)).y;\n              col.b += 0.08*texture2D(tex,0.75*vec2(x+-0.02, -0.018)+vec2(uv.x-0.002,uv.y+0.000)).z;\n  \n              col = clamp(col*0.6+0.4*col*col*1.0,0.0,1.0);\n  \n              float vig = (0.0 + 1.0*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y));\n              col *= vec3(pow(vig,0.3));\n  \n              col *= vec3(0.95,1.05,0.95);\n              col *= 2.8;\n  \n              float scans = clamp( 0.35+0.35*sin(3.5*iTime+uv.y*gl_FragCoord.y/uv.y*1.5), 0.0, 1.0);\n              \n              float s = pow(scans,1.7);\n              col = col*vec3( 0.4+0.7*s) ;\n  \n              col *= 1.0+0.01*sin(110.0*iTime);\n              if (uv.x < 0.0 || uv.x > 1.0)\n                  col *= 0.0;\n              if (uv.y < 0.0 || uv.y > 1.0)\n                  col *= 0.0;\n              \n              col*=1.0-0.65*vec3(clamp((mod(gl_FragCoord.x, 2.0)-1.0)*2.0,0.0,1.0));\n              \n              float comp = smoothstep( 0.1, 0.9, sin(iTime) );\n  \n              gl_FragColor = vec4(col, 1.0);\n          }\n      "]);return b=function(){return e},e}function E(){var e=Object(p.a)(["\n              precision mediump float;\n              uniform sampler2D tex;\n              varying vec2 uv;\n      \n              void main()\n              {\n                  vec3 col = texture2D( tex, uv ).xyz;\n                  gl_FragColor = vec4(col, 1.0);\n              }\n          "]);return E=function(){return e},e}var j=g.Shaders.create({ORIGINAL:{frag:Object(g.GLSL)(E())},CRT:{frag:Object(g.GLSL)(b())},VHS:{frag:Object(g.GLSL)(y())}}),w={ORIGINAL:{reference:"",shader:j.ORIGINAL},CRT:{reference:"[MattiasCRT](https://www.shadertoy.com/view/Ms23DR)",shader:j.CRT},VHS:{reference:"[VHS Shader](https://www.shadertoy.com/view/MsK3zw)",shader:j.VHS}},O=n(248);var S=Object(a.forwardRef)((function(e,t){var n=Object(a.useContext)(A).rawImage,c=Object(a.useState)(null),l=Object(o.a)(c,2),i=l[0],u=l[1];return Object(a.useImperativeHandle)(t,(function(){return{download:function(){var e=i.captureAsDataURL("image/jpeg",.75);O.saveAs(e,"download.jpg")}}})),r.a.createElement(a.Fragment,null,r.a.createElement(x.Surface,{width:e.width,height:e.height,ref:function(e){return u(e)},webglContextAttributes:{preserveDrawingBuffer:!0},pixelRatio:e.pixelRatio},r.a.createElement(g.Node,{shader:w[e.shaderName].shader,uniforms:{tex:n,iTime:1}})))})),R=n(152),C=n.n(R);function D(){var e=Object(a.useContext)(A),t=e.rawImage,n=e.setRawImage,c=e.width,l=e.setWidth,g=e.height,x=e.setHeight,p=e.curShader,y=Object(a.useState)(1),b=Object(o.a)(y,2),E=b[0],j=b[1],w=Object(a.useRef)();function O(e){var t=new Image;t.onload=function(){var a=Math.max(1,t.width/800,t.height/600);l(t.width),x(t.height),j(a),n(e)},t.src=e}function R(e){var t=new FileReader;return t.readAsDataURL(e),t.onload=function(e){O(e.target.result)},!1}function D(){n(null)}return O(C.a),r.a.createElement(a.Fragment,null,t?r.a.createElement(a.Fragment,null,r.a.createElement(m.a,{justify:"center"},r.a.createElement(f.a,null,r.a.createElement(S,{width:c/E,height:g/E,pixelRatio:E,shaderName:p,ref:w}))),r.a.createElement(m.a,{justify:"center"},r.a.createElement(v.a,null,r.a.createElement(h.a,{onClick:D,type:"primary",shape:"round",size:"large",icon:r.a.createElement(u.a,null)},"Remove"),r.a.createElement(h.a,{onClick:function(){return w.current.download()},type:"primary",shape:"round",size:"large",icon:r.a.createElement(s.a,null)},"Download")))):r.a.createElement(m.a,{justify:"center",align:"middle"},r.a.createElement(f.a,{span:16},r.a.createElement(d.a.Dragger,{name:"file",multiple:!1,beforeUpload:R,height:500},r.a.createElement("p",{className:"ant-upload-drag-icon"},r.a.createElement(i.a,null)),r.a.createElement("p",{className:"ant-upload-text"},"Click or drag file to this area"),r.a.createElement("p",{className:"ant-upload-hint"},"Your files won't be uploaded to any servers, they will only be used locally."),r.a.createElement("p",{className:"ant-upload-hint"},"Enjoy.")))))}var T=n(328);function I(){var e=Object(a.useContext)(A),t=e.width,n=e.height,c=e.setCurShader,l=Object(a.useState)(1),i=Object(o.a)(l,2),u=i[0],s=i[1],d=Object(a.useState)(0),v=Object(o.a)(d,2),h=v[0],g=v[1];function x(e){g(e),c(Object.keys(w)[e])}return Object(a.useEffect)((function(){s(Math.max(1,t/200,n/150))}),[t,n]),r.a.createElement(m.a,{justify:"center",align:"middle",gutter:[32,32]},r.a.createElement(T.default.Group,{onChange:function(e){return x(e.target.value)},value:h},Object.keys(w).map((function(e,a){return r.a.createElement(f.a,{key:a,onClick:function(){return x(a)},value:a},r.a.createElement(m.a,{justify:"center"},r.a.createElement(S,{width:t/u,height:n/u,pixelRatio:u,shaderName:e})),r.a.createElement(m.a,{justify:"center"},r.a.createElement(T.default,{value:a},e)))}))))}n(319);var N=n(329),V=n(331),L=n(337),U=N.a.Header,F=N.a.Sider,G=N.a.Content,k=N.a.Footer,A=r.a.createContext({});var H=function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(0),i=Object(o.a)(l,2),u=i[0],s=i[1],m=Object(a.useState)(0),f=Object(o.a)(m,2),d=f[0],v=f[1],h=Object(a.useState)("ORIGINAL"),g=Object(o.a)(h,2),x=g[0],p=g[1];return r.a.createElement(A.Provider,{value:{rawImage:n,setRawImage:c,width:u,setWidth:s,height:d,setHeight:v,curShader:x,setCurShader:p}},r.a.createElement("div",{className:"App"},r.a.createElement(N.a,{className:"layout"},r.a.createElement(U,null,r.a.createElement(V.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["1"]},r.a.createElement(V.a.Item,{key:"1",icon:r.a.createElement(L.a,null)},"Old School Filter"))),r.a.createElement(N.a,null,r.a.createElement(G,{style:{padding:"20px 20px",minHeight:document.documentElement.clientHeight-134}},r.a.createElement(D,null)),n?r.a.createElement(F,{width:240,style:{padding:"20px 20px"}},r.a.createElement(I,null)):null),r.a.createElement(k,{style:{textAlign:"center"}},"Old School Filter \xa92020 Created by Wenduo Yue"))))};l.a.render(r.a.createElement(H,null),document.getElementById("root"))}},[[176,1,2]]]);
//# sourceMappingURL=main.d6304500.chunk.js.map