import { Box, Card, Typography, Button, Container, Stack, IconButton, Paper } from '@mui/material';
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
import { getValidSubscription } from '@/libs/data';
import { getCreditCard } from '@/libs/stripe/creditCard';
import { hasCancellationHistory as checkCancellationHistory } from '@/libs/data';
import CancelSubscriptionButton from './CancelSubscriptionButton';

type Subscription = {
    id: string;
    stripeSubscriptionId: string;
    startTimestamp: number;
    endTimestamp: number;
  }
  
  type CreditCard = {
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
  }

const CurrentPlanPage = ({ user }: { user: User }) => {
    const [subscription, setSubscription] = React.useState<Subscription | null>(null)
    const [creditCard, setCreditCard] = React.useState<CreditCard | null>(null)
    const [hasCancellationHistory, setHasCancellationHistory] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if (user) {
            const getCurrentPlan = async () => {
                const subscription = await getValidSubscription(user.email)
                if (subscription == null) {
                    return null;
                }
                setSubscription(subscription)
                const creditCard = await getCreditCard(subscription.stripeSubscriptionId) 
                setCreditCard(creditCard)
                setIsLoading(false)
            }
            getCurrentPlan()
        }
    }, [user])

    React.useEffect(() => {
        if (subscription) {
            const checkCancellationHistoryStatus = async () => {
                const hasHistory = await checkCancellationHistory(subscription.stripeSubscriptionId);
                setHasCancellationHistory(hasHistory);
            }
            checkCancellationHistoryStatus();
        }
    }, [subscription])

    return (
        <>
        {isLoading ?
        <LoadingPage />
        :
        <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            mt: 3,
            '@media (min-width: 900px)': {
                gridColumn: 'span 4'
            }
        }}>
            <Box sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 2,
                p: 2
            }}>
                <Box sx={{ 
                    bgcolor: 'white',
                    position: 'relative',
                    pb: { xs: 10, md: 0 },
                    overflow: 'auto',
                    width: '100%'
                }}>
                    <IconButton 
                        sx={{ 
                            position: 'fixed',
                            top: 16,
                            right: 16,
                            zIndex: 1001
                        }}
                        onClick={() => window.history.back()}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Container 
                    maxWidth="lg" 
                    sx={{ 
                        py: 8,
                        mb: { xs: 8, md: 0 }
                    }}
                >
                    <Card elevation={2} sx={{ p: 3 }}>
                        <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: 16 }}>
                                サブスクリプション期間
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                開始日: {new Date(subscription.startTimestamp * 1000).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                終了日: {new Date(subscription.endTimestamp * 1000).toLocaleDateString()}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: 16 }}>
                                お支払い方法
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                カード番号: **** **** **** {creditCard.last4}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                カード種類: {creditCard.brand}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                有効期限: {`${creditCard.exp_month}/${creditCard.exp_year}`}
                            </Typography>
                        </Box>
                        </Stack>
                    </Card>
                    {!hasCancellationHistory ?
                    <CancelSubscriptionButton subscriptionId={subscription.stripeSubscriptionId} />
                    :
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
                            {new Date(subscription.endTimestamp * 1000).toLocaleDateString()}までご利用いただけます。
                        </Typography>
                    </Box>
                    }
                </Container>
            </Box>
        </Box>
        }
        </>
    );
};

export default CurrentPlanPage;
