'use client';

import { Box, Card, Typography, Button, Container, Stack, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { mainColor } from '@/constants/Color';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Radio } from '@mui/material';
import { getPricesForProduct } from '@/libs/stripe/price';
import { Price } from '@/types/stripe/Price';
import { freeplans, plansDescription } from '@/constants/plan/Plans';
import LoadingPage from '@/components/LoadingPage';
import type { User } from 'firebase/auth';
import { cancelSubscription } from '@/libs/stripe/action';
import ConfirmModal from '@/features/common/contents/modal/ConfirmModal';
import { useRouter } from 'next/navigation';
export default function CancelSubscriptionButton({ subscriptionId }: { subscriptionId: string }) {
  const router = useRouter();

  const [disabled, setDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const cancelSubscriptionWithId = async () => {
    setDisabled(true);
    try {
      await cancelSubscription(subscriptionId);
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  return (
    <>
    <ConfirmModal
      open={open}
      setOpen={setOpen}
      title="サブスクの解約しますか？"
      message="サブスクリプションを解約すると、更新が止まります。"
      confirmText="はい"
      onSubmit={() => {
        setOpen(false);
        cancelSubscriptionWithId();
        router.push('/setting');
      }}
    />
    <Box sx={{ 
      borderRadius: 1, 
      p: { xs: 2, md: 3 } 
    }}>
        <Button 
          type="submit" 
          disabled={disabled}
          variant="contained"
          sx={{ 
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: mainColor,
            color: 'white',
          }}
          onClick={() => setOpen(true)}
        >
          サブスクリプションをキャンセル
        </Button>
    </Box>
    </>
  );
}