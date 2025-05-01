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

type PageProps = {
    user: User,
    backPage: () => void
}

const PlanPage = ({ user, backPage }: PageProps) => {
    const [selectedPlan, setSelectedPlan] = React.useState(null); // 初期値を6ヶ月に設定
    const [prices, setPrices] = React.useState<Price[]>([]);
    const [planOptions, setPlanOptions] = React.useState([]);

    React.useEffect(() => {
        const fetchPrices = async () => {
            const STRIPE_PRODUCT_ID = process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID;

            if (STRIPE_PRODUCT_ID == null) {
                throw new Error(`Stripe product id must be set.`);
            }
    
            const prices = await getPricesForProduct(STRIPE_PRODUCT_ID);
    
            setPrices(prices);
            setPlanOptions(prices.map((price) => ({
                id: price.id,
                title: price.title,
                description: price.description || "",
                price: price.unit_amount,
                period: price.intervalText,
                isRecommended: price.default,
                buttonText: "アップグレードする",
                priceId: price.id
            })));
            setSelectedPlan(prices.find((price) => price.default)?.id);
        }
        fetchPrices();
    }, []);

    const handleChoosePlanClick = async (
        event: React.MouseEvent<HTMLButtonElement>,
        priceId: string
    ) => {
        event.preventDefault();
        const response = await fetch('/api/stripe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId: priceId, email: user.email || "" }),
        });
        const session = await response.json();
        window.location.href = session.url;
    };

    // モバイル用の表形式表示
    const MobileView = () => (
        <TableContainer component={Card} sx={{ mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Free</TableCell>
                        <TableCell align="center" sx={{ color: mainColor }}>Pro</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>アクション</TableCell>
                        <TableCell align="center">10個</TableCell>
                        <TableCell align="center" sx={{ color: mainColor }}>無制限</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ノート</TableCell>
                        <TableCell align="center">週5個</TableCell>
                        <TableCell align="center" sx={{ color: mainColor }}>無制限</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ボード</TableCell>
                        <TableCell align="center">3個</TableCell>
                        <TableCell align="center" sx={{ color: mainColor }}>無制限</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>広告</TableCell>
                        <TableCell align="center">あり</TableCell>
                        <TableCell align="center" sx={{ color: mainColor }}>なし</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <>
            {planOptions.length == 0 ? 
                <LoadingPage />
            :
            <Box sx={{ 
                bgcolor: 'white',
                position: 'relative',
                pb: { xs: 10, md: 0 },
                overflow: 'auto',
                height: '100vh',
                width: '100%'
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
                    onClick={backPage}
                >
                    <CloseIcon />
                </IconButton>
                <Container 
                    maxWidth="lg" 
                    sx={{ 
                        py: 8,
                        mb: { xs: 8, md: 0 }
                    }}
                >
                    <Typography 
                        variant="h4" 
                        textAlign="center" 
                        mb={6}
                        sx={{
                            fontSize: { xs: '1.5rem', md: '1.75rem' }
                        }}
                    >
                        現在のプランをアップグレードする
                    </Typography>
                    
                    {/* デスクトップ表示 */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={4}
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            {freeplans && 
                                <PlanCard
                                    key={freeplans.title}
                                    plan={freeplans}
                                    description={freeplans.description}
                                    onClick={() => {}}
                                />
                            }

                            {planOptions.length > 0 && planOptions.map((plan) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    description={plansDescription}
                                    onClick={(event) => handleChoosePlanClick(event, plan.priceId)}
                                />
                            ))}
                        </Stack>
                    </Box>

                    {/* モバイル表示 */}
                    <Box 
                        sx={{ 
                            display: { xs: 'block', md: 'none' },
                            maxWidth: { sm: '400px' },  // 400pxに変更
                            mx: 'auto'
                        }}
                    >
                        <MobileView />

                        <Stack spacing={2} sx={{ mt: 4 }}>
                            {planOptions.map((plan) => (
                                <MobilePlanCard
                                    key={plan.id}
                                    plan={plan}
                                    selectedPlan={selectedPlan}
                                    setSelectedPlan={setSelectedPlan}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Container>

                {/* スマホの時だけ表示するスティッキーボタン */}
                <Box sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'white',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                    p: 2,
                    zIndex: 1000
                }}>
                    <Container maxWidth="lg">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: mainColor,
                                py: 1.5,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: mainColor,
                                    opacity: 0.8
                                }
                            }}
                            onClick={(event) => handleChoosePlanClick(event, selectedPlan)}
                        >
                            アップグレードする
                        </Button>
                    </Container>
                </Box>
            </Box>
            </Box>
        }
        </>
    );
}

const PlanCard = ({ plan, description, onClick }: { 
    plan: any, 
    description: string[],
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>  | void
}) => {
    return (
        <Card
            key={plan.title}
            sx={{
                maxWidth: 350,
                width: '100%',
                p: 4,
                position: 'relative',
                border: plan.isPopular ? `2px solid ${mainColor}` : '1px solid #e0e0e0',
                transform: plan.isPopular ? 'scale(1.05)' : 'none',
            }}
        >
            {(plan.isRecommended) && (
                <Typography
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: plan.isRecommended ? mainColor : '#4caf50',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '1rem',
                    }}
                >
                    20%OFF
                </Typography>
            )}
            <Typography variant="h5" fontWeight="bold" mb={2}>
                {plan.title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" mb={1}>
                ¥{plan.price.toLocaleString('ja-JP')}
            </Typography>
            <Typography color="text.secondary" mb={4}>
                /{plan.period}
            </Typography>
            <Box mb={4}>
                {description.map((line, index) => (
                    <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={1}
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            pr: 2
                        }}
                    >
                        <CheckIcon color="primary" fontSize="small" />
                        <Typography sx={{ 
                            fontSize: '0.875rem',
                            lineHeight: 1.5,
                            display: 'block',
                            width: '100%'
                        }}>
                            {line}
                        </Typography>
                    </Stack>
                ))}
            </Box>
            <Button
                variant={plan.isCurrentPlan ? "outlined" : "contained"}
                fullWidth
                disabled={plan.isCurrentPlan}
                sx={{ 
                    mt: 'auto',
                    bgcolor: plan.isCurrentPlan ? 'transparent' : mainColor,
                    borderColor: mainColor,
                    '&:hover': {
                        bgcolor: plan.isCurrentPlan ? 'transparent' : mainColor,
                        opacity: 0.8
                    }
                }}
                onClick={onClick}
            >
                {plan.buttonText}
            </Button>
        </Card>
    );
};

const MobilePlanCard = ({ plan, selectedPlan, setSelectedPlan }: { plan: any, selectedPlan: string, setSelectedPlan: (planId: string) => void }) => (
    <Card
        key={plan.id}
        sx={{
            p: 3,
            cursor: 'pointer',
            border: selectedPlan === plan.id ? `2px solid ${mainColor}` : '1px solid #e0e0e0',
            position: 'relative'
        }}
        onClick={() => setSelectedPlan(plan.id)}
    >
        {plan.isRecommended && (
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: mainColor,
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '1rem'
                    }}
                >
                    20%OFF
                </Typography>
            </Stack>
        )}
        <Stack direction="row" alignItems="center" spacing={2}>
            <Radio
                checked={selectedPlan === plan.id}
                sx={{
                    color: mainColor,
                    '&.Mui-checked': {
                        color: mainColor,
                    }
                }}
            />
            <Box>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {plan.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ¥{plan.price.toLocaleString('ja-JP')}
                    <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                        /{plan.period}
                    </Typography>
                </Typography>
                {plan.discount && (
                    <Typography color="success.main" sx={{ mt: 0.5 }}>
                        {plan.discount}
                    </Typography>
                )}
            </Box>
        </Stack>
    </Card>
);

export default PlanPage;
