import React, { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Layout from "../components/layouts/layout";
import SwapContainer from "../components/ui/swapContainer";
import TokenListModal from "../components/ui/tokenListModal";
import ArrowDown from "../components/arrow";

const IconWrapper = styled(Button)`
  margin: 15px;
  color: rgb(86, 90, 105);
  text-align: center;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
`;

const DisabledSwapContainer = styled.div`
  pointer-events: none;
  opacity: 0.4;
`;

const MainCard = styled(Card)``;

const Title = styled.div`
  background-color: #e6f7ff;

  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  /* or 140% */

  padding-top: 6px;
  margin-bottom: 12px;
  padding-left: 6px;
  color: #000000;
`;

const SwapButton = styled(Button)`
  background: #69c0ff !important;
  border-color: #69c0ff !important;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
  border-radius: 10px;
  width: 100%;
  height: 60px;
  margin-top: 7%;

  font-family: IBM Plex Mono !important;
  font-weight: 400 !important;
  font-size: 16px !important;
`;

const InitialSwapContainer = ({ token, setToken, ...props }) => {
  return <SwapContainer token={token} setToken={setToken} {...props} />;
};

InitialSwapContainer.propTypes = {
  token: PropTypes.any.isRequired,
  setToken: PropTypes.any.isRequired,
};

const Home = () => {
  const methods = useForm({ mode: "onChange" });
  const [tokens] = useState([
    {
      name: "ETH",
      icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      precision: 4,
      contract: "Ether",
      isDefault: true,
      isSelected: false,
    },
    {
      name: "PAL",
      icon: "https://www.paladin.vote/src/media/logo/xicon_transparent.png.pagespeed.ic.ZzQdY_jeOS.webp",
      precision: 4,
      contract: "PAL",
      isDefault: false,
      isSelected: false,
    },
  ]);
  const [tokenModalShow, setTokenModalShow] = useState(false);
  const [callBackSwap, setCallBackSwap] = useState(null);
  const [loading, isLoading] = useState(true);

  const [token1, setToken1] = React.useState();
  const [token2, setToken2] = React.useState();

  useEffect(() => {
    if (!token1) {
      const defaultToken1 = tokens.find((token) => token.isDefault);
      setToken1(defaultToken1);
    }
  }, [tokens, token1, token2]);

  useEffect(() => {
    isLoading(false);
  }, [isLoading]);

  const switchTokens = () => {
    if (!token1 || !token2) {
      return;
    }

    const tokenTemp = token1;
    setToken1(token2);
    setToken2(tokenTemp);

    const { FromAmount, ToAmount } = methods.getValues();
    methods.setValue("FromAmount", ToAmount);
    methods.setValue("ToAmount", FromAmount);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  const openModal = useCallback(
    (callback, name) => {
      setTokenModalShow(true);
      setCallBackSwap({ func: callback, prevToken: name });
    },
    [setTokenModalShow, setCallBackSwap]
  );

  const closeModal = useCallback(
    ({ name, icon, contract, precision }) => {
      setTokenModalShow(false);
      callBackSwap.func({
        name,
        icon,
        contract,
        precision,
      });
    },
    [callBackSwap]
  );

  const handleAmountOnChange = (value, field) => {
    switch (field) {
      case "FromBalanceClick":
        methods.setValue("FromAmount", value.toString().split(" ")[0]);
        break;
      case "ToBalanceClick":
        methods.setValue("ToAmount", value.toString().split(" ")[0]);
        break;
      default:
        break;
    }
  };

  const onInputClick = (value, field, ref) => {
    const initValue = parseFloat(value) ? parseFloat(value) : 0;
    const handleClickout = (e) => {
      const updatedValue = parseFloat(methods.getValues(field))
        ? parseFloat(methods.getValues(field))
        : 0;
      if (ref.current && !ref.current.contains(e.target)) {
        if (updatedValue === 0) {
          methods.setValue(field, "0.000");
        } else {
          methods.setValue(field, methods.getValues(field));
        }
        document.removeEventListener("click", handleClickout);
      }
    };
    if (initValue === 0) {
      methods.setValue(field, " ");
      document.addEventListener("click", handleClickout);
    } else {
      methods.setValue(field, value);
      document.addEventListener("click", handleClickout);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <Layout>
      <Container className="p-2 mt-5" fluid>
        <FormProvider {...methods}>
          <Row>
            <Col>
              <MainCard className="mx-auto">
                <MainCard.Body>
                  <Title>Swap</Title>
                  <Form onSubmit={methods.handleSubmit(onSubmit)}>
                    {token1 ? (
                      <InitialSwapContainer
                        token={token1}
                        setToken={setToken1}
                        header="From"
                        setModalShow={setTokenModalShow}
                        onSwapTokenClick={openModal}
                        onSwapTokenChange={handleAmountOnChange}
                        onInputClick={onInputClick}
                      />
                    ) : (
                      <DisabledSwapContainer>
                        <InitialSwapContainer
                          token="null"
                          setToken={setToken1}
                          header="From"
                          setModalShow={setTokenModalShow}
                          onSwapTokenClick={openModal}
                          onSwapTokenChange={handleAmountOnChange}
                          onInputClick={onInputClick}
                        />
                      </DisabledSwapContainer>
                    )}
                    <div className="d-flex justify-content-center">
                      <IconWrapper
                        style={{ margin: 0 }}
                        bsPrefix="switch"
                        onClick={switchTokens}
                      >
                        <ArrowDown />
                      </IconWrapper>
                    </div>
                    <SwapContainer
                      token={token2}
                      setToken={setToken2}
                      header="To"
                      initialToken={null}
                      setModalShow={setTokenModalShow}
                      onSwapTokenClick={openModal}
                      onSwapTokenChange={handleAmountOnChange}
                      onInputClick={onInputClick}
                    />
                    <SwapButton type="submit">ENTER AN AMOUNT</SwapButton>
                  </Form>
                </MainCard.Body>
              </MainCard>
            </Col>
          </Row>
          <TokenListModal
            onSelectToken={closeModal}
            show={tokenModalShow}
            onHide={() => setTokenModalShow(false)}
            callBackSwap={callBackSwap}
          />
        </FormProvider>
      </Container>
    </Layout>
  );
};

export default React.memo(Home);
