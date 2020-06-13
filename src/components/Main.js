import { Header, Footer, TitleBar } from "./layout";
import React, { useCallback, useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import {
  getBrandList as getBrandListApi,
  getModelList as getModelListApi,
  getModelOne as getModelOneApi,
  saveRequestEstimate
} from "../helpers/apiList";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CheckEmail, CheckNumber } from "../helpers/commonHelpers";
import { useAppDispatch, useAppState } from './contexts/AppContext';

const initialSelectedInfo = {
  brandName: "",
  brandCode: "",
  modelCode: "",
  modelName: "",
  modelImage: "",
  gradeCode: -1,
  gradeName: "",
  trimName: "",
  receiverName: "",
  receiverPhone: "",
  receiverEmail: "",
  requestMemo: "",
  agree: false
};

const Main = () => {
  const { loading } = useAppState();
  const dispatch = useAppDispatch();
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [carInfo, setCarInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(initialSelectedInfo);

  const getBrandListCall = useCallback(() => getBrandList(), []);
  const getModelListCall = useCallback(brandCode => getModelList(brandCode), [
    selectedInfo.brandCode
  ]);
  const getModelOneCall = useCallback(modelCode => getModelOne(modelCode), [
    selectedInfo.modelCode
  ]);

  const brandClicked = (brandCode, brandName) => {
    setSelectedInfo({ ...selectedInfo, brandCode, brandName });
    getModelListCall(brandCode);
  };

  const modelClicked = (modelCode, modelName, imageUrl) => {
    setSelectedInfo({
      ...selectedInfo,
      modelCode,
      modelName,
      modelImage: imageUrl
    });
    getModelOneCall(modelCode);
  };

  const trimClicked = trimName => {
    console.log(trimName);
    setSelectedInfo({
      ...selectedInfo,
      trimName
    });
  };

  const gradeClicked = (gradeName, gradeCode) => {
    setSelectedInfo({ ...selectedInfo, gradeCode, gradeName });
  };

  const onSave = () => {
    if (!selectedInfo.brandName) {
      alert("제조사를 선택해 주세요.");
      return false;
    }

    if (!selectedInfo.gradeName) {
      alert("등급을 선택해 주세요.");
      return false;
    }

    if (!selectedInfo.modelName) {
      alert("모델을 선택해 주세요.");
      return false;
    }

    if (!selectedInfo.receiverName) {
      alert("성함을 입력해주세요.");
      return false;
    }

    if (!selectedInfo.receiverPhone && !selectedInfo.receiverEmail) {
      alert("견적 받으실 휴대폰 또는 Email을 작성 하셔야 합니다.");
      return false;
    }

    if (CheckEmail(selectedInfo.receiverEmail)) {
      alert("이메일 형식을 다시 확인해 주시기 바랍니다.");
      return false;
    }

    if (CheckNumber(selectedInfo.receiverPhone)) {
      alert("휴대폰 번호 형식을 다시 확인해 주시기 바랍니다.");
      return false;
    }

    if (selectedInfo.agree !== "on") {
      alert("정보 제공 동의를 체크해주세요.");
      return false;
    }

    saveEstimate(selectedInfo);
  };

  useEffect(() => {
    getBrandListCall();
    (async ()=>{
      await new Promise(r => setTimeout(r, 2000));
      dispatch({type:'LOADING', loading:false})
    })();
  }, []);

  return (
      <LoadingScreen
        loading={loading}
        bgColor="#ffffff"
        textColor="#676767"
        logoSrc="/Car-Loader2.gif"
      >
        <Header />
        <main>
          <TitleBar />
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <ListGroup
                style={{ justifyContent: "center", textAlign: "center" }}
                activeKey={selectedInfo.brandCode}
              >
                {brandList.length > 0 &&
                  brandList.map(({ id, brandCode, brandLogo, brandName }) => (
                    <ListGroup.Item
                      className="pointer"
                      key={brandCode}
                      href={brandCode}
                      onClick={() => brandClicked(brandCode, brandName)}
                    >
                      <Row>
                        <Image
                          style={{ marginLeft: 5 }}
                          src={brandLogo}
                          alt={brandName}
                        />
                        <span style={{ marginTop: 15, marginLeft: 20 }}>
                          {brandName}
                        </span>
                      </Row>
                    </ListGroup.Item>
                  ))}
                {brandList.length === 0 && "작업 중 입니다...."}
              </ListGroup>
              <ListGroup
                style={{ marginTop: 20, width: 400, height: 150 }}
                activeKey={selectedInfo.modelCode}
                className="overflow-auto"
              >
                {modelList.length > 0 &&
                  modelList.map(({ _id, etcInfo, title, image, factor }) => {
                    return (
                      <ListGroup.Item
                        key={_id}
                        className="pointer"
                        href={etcInfo.orgId}
                        onClick={() =>
                          modelClicked(etcInfo.orgId, title, image.exterior)
                        }
                      >
                        {title}
                      </ListGroup.Item>
                    );
                  })}
                {modelList.length === 0 && (
                  <ListGroup.Item className="pointer" href="#">
                    브랜드를 선택하세요.
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
            {carInfo && selectedInfo.modelName && (
              <div
                className="feature_newcar"
                style={{ marginTop: 20, position: "relative" }}
              >
                <Image src={selectedInfo.modelImage} width={400} />
                <div className="cont_thumb">
                  <strong className="tit_thumb">
                    {selectedInfo.modelName} {carInfo.currentYear}
                  </strong>
                  <dl className="info_thumb" style={{ textAlign: "left" }}>
                    <dt>
                      가격{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.price}
                      </span>
                    </dt>
                    <dt>
                      연비{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.efficiency}
                      </span>
                    </dt>
                    <dt>
                      배기량{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.displacement}
                      </span>
                    </dt>
                  </dl>
                  <dl className="info_thumb" style={{ textAlign: "left" }}>
                    <dt>
                      외장{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.segments}
                      </span>
                    </dt>
                    <dt>
                      연료{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.powerTrains}
                      </span>
                    </dt>
                    <dt>
                      인원{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        {carInfo.passengers}
                      </span>
                    </dt>
                  </dl>
                </div>
                <ListGroup
                  className="pointer"
                  activeKey={selectedInfo.gradeCode + 1}
                >
                  <Form.Label style={{ color: "gray", marginBottom: 5 }}>
                    등급
                  </Form.Label>
                  {carInfo &&
                    carInfo.gradeList.length > 0 &&
                    carInfo.gradeList.map((grade, index) => {
                      const gradeName = `${grade.name} ${grade.displacement} ${grade.price}`;

                      return (
                        <ListGroup.Item
                          key={grade.id}
                          href={index + 1}
                          onClick={() => gradeClicked(gradeName, index)}
                        >
                          {grade.name} {grade.displacement} {grade.price}
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
                <Form.Group
                  controlId="exampleForm.ControlSelect1"
                  style={{ marginTop: 20 }}
                >
                  <Form.Label style={{ color: "gray", marginBottom: 5 }}>
                    트림
                  </Form.Label>
                  <Form.Control as="select">
                    {selectedInfo.gradeCode === -1 && <option>선택</option>}
                    {selectedInfo.gradeCode !== -1 &&
                      carInfo.gradeList[selectedInfo.gradeCode].trimList.map(
                        trim => {
                          const trimName = `${trim.name} / ${trim.price} 만원`;
                          return (
                            <option
                              key={trim.id}
                              value={trimName}
                              onSelect={() => trimClicked(trimName)}
                            >
                              {trimName}
                            </option>
                          );
                        }
                      )}
                  </Form.Control>
                </Form.Group>
              </div>
            )}
            <Form style={{ position: "relative", marginTop: 20 }}>
              <Form.Label style={{ color: "gray", marginBottom: 5 }}>
                연락처
              </Form.Label>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="name"
                  placeholder="성함"
                  onChange={e =>
                    setSelectedInfo({
                      ...selectedInfo,
                      receiverName: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Control
                  type="phone"
                  placeholder="연락처 010-XXXX-XXXX"
                  onChange={e =>
                    setSelectedInfo({
                      ...selectedInfo,
                      receiverPhone: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="이메일 name@example.com"
                  onChange={e =>
                    setSelectedInfo({
                      ...selectedInfo,
                      receiverEmail: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  placeholder="요청사항(리스, 할부, 일시불, 렌트 등)"
                  rows="3"
                  onChange={e =>
                    setSelectedInfo({
                      ...selectedInfo,
                      requestMemo: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label={"정보 제공 동의"}
                  onChange={e =>
                    setSelectedInfo({ ...selectedInfo, agree: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={onSave}
              >
                견적 신청
              </Button>
            </Form>
          </div>
        </main>
        <Footer />
      </LoadingScreen>
  );

  function getBrandList() {
    getBrandListApi()
      .then(({ data: { success, data } }) => success && setBrandList(data))
      .catch(err => console.log(`getBrandList err :`, err));
  }

  function getModelList(brandCode) {
    getModelListApi(brandCode)
      .then(({ data: { success, data } }) => success && setModelList(data))
      .catch(err => console.log(`getModelList err :`, err));
  }

  function getModelOne(modelCode) {
    getModelOneApi(modelCode)
      .then(({ data: { success, data } }) => success && setCarInfo(data))
      .catch(err => console.log(`getModelOne err :`, err));
  }

  function saveEstimate(info) {
    return saveRequestEstimate(info).then(({ data: { message, success } }) => {
      if (success) {
        alert("견적 신청이 완료 되었습니다.\n 바로 연락드리겠습니다.");
        window.location.replace("/");
      } else {
        alert("잠시 서버에 문제가 있습니다.\n 다시 시도 부탁드립니다.");
      }
    });
  }
};

export default Main;
