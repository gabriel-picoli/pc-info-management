import styled from 'styled-components'

const StyledButton = styled.button<{
  $backgroundColor?: string
  $marginLeft?: string
  $width?: string
  $height?: string
  $textColor?: string
  $hoverBackgroundColor?: string
  $cancel?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;

  background-color: ${(props) =>
    props.$cancel ? '#FF4D4D' : props.$backgroundColor || 'transparent'};
  margin-left: ${(props) => props.$marginLeft || '0px'};
  transition: all 0.2s ease-in;
  border-radius: 30px;
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || '35px'};
  color: ${(props) => props.$textColor || 'black'};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.226);
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$cancel ? '#FF7F7F' : props.$hoverBackgroundColor || '#000000'};

    color: white;
  }
`

const ButtonText = styled.p<{ $textWidth?: string }>`
  font-size: 18px;
  width: ${(props) => props.$textWidth || '200px'};
  font-weight: 500;
`

interface ButtonProps {
  backgroundColor?: string
  hoverBackgroundColor?: string
  marginLeft?: string
  width?: string
  height?: string
  textWidth?: string
  textColor?: string
  cancel?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type: 'button' | 'submit' | 'reset'
  children: string
}

export default function Button({
  backgroundColor,
  hoverBackgroundColor,
  marginLeft,
  width,
  height,
  textWidth,
  textColor,
  cancel,
  onClick,
  type,
  children,
}: ButtonProps) {
  return (
    <StyledButton
      $backgroundColor={backgroundColor}
      $hoverBackgroundColor={hoverBackgroundColor}
      $marginLeft={marginLeft}
      $width={width}
      $height={height}
      $textColor={textColor}
      $cancel={cancel}
      onClick={onClick}
      type={type}
    >
      <ButtonText $textWidth={textWidth}>{children}</ButtonText>
    </StyledButton>
  )
}
