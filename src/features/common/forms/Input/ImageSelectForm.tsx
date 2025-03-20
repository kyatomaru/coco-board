import React from 'react';
import { Box, Button, IconButton, Stack, Typography, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface ImageSelectFormProps {
    selectedFiles: any;
    setSelectedFiles: any;
    maxImages?: number;
    isLoading: boolean;
}

export const ImageSelectForm: React.FC<ImageSelectFormProps> = ({
    selectedFiles,
    setSelectedFiles,
    maxImages = 5,
    isLoading
}) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (selectedFiles.length + files.length > maxImages) {
            alert(`画像は最大${maxImages}枚までです`);
            return;
        }
        setSelectedFiles([...selectedFiles, ...files]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    React.useEffect(() => {
        console.log(selectedFiles)
    }, [selectedFiles])

    return (
        <Box>
            {isLoading ?
                <Stack direction="row" justifyContent="center" alignItems="center"
                    sx={{
                        width: "100%",
                        height: "200px",
                    }}>
                    <CircularProgress sx={{ mx: "auto" }} color="success" />
                </Stack>
                :
                <>
                    {
                        selectedFiles.length === 0 ? (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                />
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{
                                        width: "100%",
                                        height: "200px",
                                        borderRadius: 5,
                                        background: "rgba(25, 118, 210, 0.08) !important",
                                        color: "#1976d2",
                                        '&:hover': {
                                            background: "rgba(25, 118, 210, 0.12) !important",
                                        }
                                    }}
                                >
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <AddCircleOutlineIcon />
                                        <Typography sx={{ fontSize: 14, mx: 1 }}>
                                            画像を追加 ({selectedFiles.length}/{maxImages})
                                        </Typography>
                                    </Stack>
                                </Button>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                {/* 写真追加ボタン */}
                                {selectedFiles.length < maxImages && (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                        />
                                        <Button
                                            onClick={() => fileInputRef.current?.click()}
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: 2,
                                                background: "rgba(25, 118, 210, 0.08) !important",
                                                color: "#1976d2",
                                                '&:hover': {
                                                    background: "rgba(25, 118, 210, 0.12) !important",
                                                }
                                            }}
                                        >
                                            <Stack direction="row" justifyContent="center" alignItems="center">
                                                <AddCircleOutlineIcon />
                                                <Typography sx={{ fontSize: 14, mx: 1 }}>
                                                    追加 ({selectedFiles.length}/{maxImages})
                                                </Typography>
                                            </Stack>
                                        </Button>
                                    </>
                                )}

                                {/* 選択済み画像 */}
                                {selectedFiles.map((file, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: 'relative',
                                            width: 150,
                                            height: 150
                                        }}
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`選択画像 ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: 8
                                            }}
                                        />
                                        <IconButton
                                            onClick={() => {
                                                setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                            sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}
                                        >
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )
                    }
                </>
            }
        </Box>
    );
};
