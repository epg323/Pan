import { ChevronDown } from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";
import React, { useRef } from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const SwapContainerWrapper = styled.div`
  display: grid;
  background: #e6f7ff;
  /* Daybreak Blue / 3 */

  border: 3px solid #91d5ff;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 2%;
`;

const SwapTokenHeader = styled.div`
  font-size: 14px;
  float: left;
  text-align: left;
  margin: 5px;
  display: flex;
  flex-direction: row;

  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 24px;
  color: #000000;
`;

const SwapTokenContainer = styled.div`
  display: grid;
  grid-template-columns: auto 25%;
  justify-content: space-between;
`;

const SwapTokenInputContainer = styled.div``;

const SwapTokenInput = styled(Form.Control)`
  border: 0px !important;
  background-color: #e6f7ff !important;
  padding: 5px !important;
  font-size: 30px !important;
  text-align: right;
  :focus {
    box-shadow: none !important;
  }

  @media (max-width: 768px) {
    font-size: 25px !important;
  }
`;

const SwapTokenListButton = styled(Button)`
  display: flex !important;
  text-align: right !important;
  align-items: center;
  justify-content: center;
  background-color: #e6f7ff !important;
  border: 0px !important;
  width: fit-content;
  height: 100%;
  vertical-align: middle;

  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border-color: #e6f7ff !important;
  background: #e6f7ff !important;
`;

const SwapTokenSelectContainer = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px !important;
  padding: 10px !important;
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  span {
    margin-right: 3px;
  }

  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border-color: #e6f7ff !important;
  background: #e6f7ff !important;

  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000 !important;
`;

const SwapTokenName = styled.span`
  margin-left: 5px;
  font-weight: 500;
  color: black;
  margin-right: 5px;
  font-size: 25px;

  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 24px;
  color: #000000 !important;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SwapTokenIcon = styled.img`
  width: 30px;

  @media (max-width: 768px) {
    width: 20px;
  }
`;

const SwapBalance = styled.div`
  justify-self: flex-start;
  flex-grow: 1;
  cursor: pointer;
`;

const SwapHeader = styled.div`
  justify-self: flex-end;
`;

const SwapContainer = ({
  token,
  setToken,
  header,
  onSwapTokenClick,
  onSwapTokenChange,
  hideLabel,
  onInputClick,
}) => {
  const { register } = useFormContext();
  const balance = "0.0000";
  const swapRef = useRef();
  return (
    <SwapContainerWrapper>
      <SwapTokenHeader className="text-capitalize">
        <SwapHeader>{!hideLabel && header.toLowerCase()}</SwapHeader>
      </SwapTokenHeader>
      <SwapTokenContainer>
        <Form.Control
          type="hidden"
          name={`${header}Token`}
          value={token ? token.name : ""}
          ref={register({ required: true })}
        />
        {token && (
          <SwapTokenListButton
            onClick={() => {
              onSwapTokenClick(setToken, token.name);
            }}
          >
            <SwapTokenIcon src={token.icon} />
            <SwapTokenName>{token.name}</SwapTokenName>
            <ChevronDown color="black" />
          </SwapTokenListButton>
        )}
        {!token && (
          <SwapTokenSelectContainer
            variant="secondary"
            onClick={() => {
              onSwapTokenClick(setToken, null);
            }}
          >
            <span>Select token</span>
            <ChevronDown />
          </SwapTokenSelectContainer>
        )}
        <SwapTokenInputContainer>
          <SwapTokenInput
            autoComplete="off"
            name={`${header}Amount`}
            placeholder={token ? `0.${"0".repeat(token.precision)}` : "0.0000"}
            ref={(e) => {
              register(e, { required: true });
              swapRef.current = e;
            }}
            onChange={(e) =>
              onSwapTokenChange &&
              onSwapTokenChange(e.target.value, `${header}Amount`)
            }
            onClick={(e) =>
              onInputClick &&
              onInputClick(e.target.value, `${header}Amount`, swapRef)
            }
          />
        </SwapTokenInputContainer>
      </SwapTokenContainer>
      <SwapTokenHeader className="text-capitalize">
        <SwapBalance
          onClick={() =>
            onSwapTokenChange &&
            onSwapTokenChange(`${balance}`, `${header}BalanceClick`)
          }
        >
          {`Balance: ${balance}`}
        </SwapBalance>
      </SwapTokenHeader>
    </SwapContainerWrapper>
  );
};

SwapContainer.propTypes = {
  token: PropTypes.any,
  setToken: PropTypes.func,
  header: PropTypes.string.isRequired,
  onSwapTokenClick: PropTypes.func.isRequired,
  onSwapTokenChange: PropTypes.func.isRequired,
  hideLabel: PropTypes.bool,
  onInputClick: PropTypes.func.isRequired,
};

SwapContainer.defaultProps = {
  hideLabel: false,
};

export default SwapContainer;
