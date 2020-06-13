import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { confirmedEstimate, getEstimateOne } from '../helpers/apiList';

const initState = {
  requestMemo: "",
  gradeName: "",
  brandName: "",
  receiverName: "",
  agree: "",
  modelImage: "",
  trimName: "",
  modelName: "",
  receiverPhone: "",
  modelCode: "",
  id: "",
  gradeCode: 0,
  receiverEmail: "",
  brandCode: "",
  statusCode: "",
};

const Estimate = ({ match: { params: { id } } }) => {
  const [requestInfo, setRequestInfo] = useState(initState);
  useEffect(() => {
      onFetchData();
  }, [id]);

  return (
    <>
      <Form style={{ margin: 20, display: 'flex', flexDirection:'column'}}>
        <div style={{justifyContent:'center', textAlign:'center'}}>
          <Image src={requestInfo.modelImage} width={400} />
        </div>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>
          제조사
        </Form.Label>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Control type="name" readOnly value={requestInfo.brandName} />
        </Form.Group>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>등급</Form.Label>
        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Control type="name" readOnly value={requestInfo.gradeName} />
        </Form.Group>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>모델</Form.Label>
        <Form.Group controlId="exampleForm.ControlInput4">
          <Form.Control type="name" readOnly value={requestInfo.modelName} />
        </Form.Group>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>요청자 성함</Form.Label>
        <Form.Group controlId="exampleForm.ControlInput4">
          <Form.Control type="name" readOnly value={requestInfo.receiverName} />
        </Form.Group>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>요청자 휴대폰</Form.Label>
        <Form.Group controlId="exampleForm.ControlInput4">
          <Form.Control type="name" readOnly value={requestInfo.receiverPhone} />
        </Form.Group>
        <Form.Label style={{ color: "gray", marginBottom: 5 }}>요청자 이메일</Form.Label>
        <Form.Group controlId="exampleForm.ControlInput4">
          <Form.Control type="name" readOnly value={requestInfo.receiverEmail} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows="3"
            readOnly
            value={requestInfo.requestMemo}
          />
        </Form.Group>
        {
          requestInfo.statusCode === 'REQUEST' && (
              <Button variant="success" style={{ width: "100%" }} onClick={onConfirmed}>
                견적 확인
              </Button>
          )
        }
        {
          requestInfo.statusCode !== 'REQUEST' && (
              <Button variant="secondary" style={{ width: "100%" }}>
                견적확인 완료
              </Button>
          )
        }
      </Form>
    </>
  );

  function onFetchData() {
      getEstimateOne(id)
          .then(({ data: { success, data:request } }) => (success && request) || [] )
          .then(requestEstimate => requestEstimate.length && setRequestInfo(requestEstimate[0]));
  }

  function onConfirmed() {
    confirmedEstimate(id)
        .then(({ data: { success,data } }) => {
          if(success) {
            console.log(data);
            alert('돈벌러 가즈아');
            onFetchData()
          }
        })
  }
};

export default Estimate;
