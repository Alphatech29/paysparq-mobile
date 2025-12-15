import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

// --- Styled Components ---
const Card = styled(View, 'bg-[#F66B04] rounded-xl p-5 overflow-hidden relative');
const WaveBackground = styled(View, 'absolute inset-0 bg-orange-500 opacity-20');
const Label = styled(Text, 'text-white text-sm mb-1 opacity-80 font-normal');
const Row = styled(View, 'flex-row justify-between items-end');
const Balance = styled(Text, 'text-white text-xl font-bold tracking-tight');
const CurrencyWrapper = styled(View, 'flex-row items-center absolute top-[-10px] right-1');
const CurrencyText = styled(Text, 'text-white text-base font-semibold mr-1');
const StyledImage = styled(Image);

const BalanceCard = ({ balance, currencyCode, currencySymbol }) => {
  const formattedBalance = balance.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Card>
      {/* Wave & Decorative Images */}
      <WaveBackground />

      <StyledImage
        source={require('../assets/Vector-17.png')}
        className="absolute w-32 h-24 top-[-1px] right-[110px] opacity-80"
        resizeMode="contain"
      />

      <StyledImage
        source={require('../assets/Vector-16.png')}
        className="absolute w-32 h-24 top-[-1px] right-[-7px] opacity-80"
        resizeMode="contain"
      />

      {/* Card Content */}
      <Label>Your Balances</Label>

      <Row>
        <Balance>
          {currencySymbol}
          {formattedBalance}
        </Balance>

        <CurrencyWrapper>
          <CurrencyText>{currencyCode}</CurrencyText>
          <Ionicons name="chevron-down" size={16} color="#FFF" />
        </CurrencyWrapper>
      </Row>
    </Card>
  );
};

export default BalanceCard;
