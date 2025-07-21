import { useEffect } from "react";
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";

function DesmosGraph() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    useEffect(() => {
        // Load Desmos API if not already loaded
        if (!window.Desmos) {
            const script = document.createElement("script");
            script.src = "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
            script.async = true;
            script.onload = initializeDesmos;
            document.body.appendChild(script);
        } else {
            initializeDesmos();
        }

        // Cleanup function to reinitialize on resize
        const handleResize = () => {
            setTimeout(initializeDesmos, 100);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function initializeDesmos() {
        const elt = document.getElementById("calculator");
        if (elt) {
            // Clear previous instance
            elt.innerHTML = '';
            const calculator = window.Desmos.GraphingCalculator(elt, {
                expressionsCollapsed: isMobile, // Collapse expressions on mobile
                settingsMenu: !isMobile, // Hide settings menu on mobile for more space
                zoomButtons: true,
                expressionsTopbar: !isMobile
            });
            calculator.setExpression({ id: "graph1", latex: "y=x^2" });
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on mobile
                gap: { xs: 2, sm: 3, md: 4 },
                p: { xs: 1, sm: 2, md: 3 },
                maxWidth: '100%',
                overflow: 'hidden'
            }}
        >
            {/* Instruction Card */}
            <Card 
                sx={{ 
                    width: { xs: '100%', md: '300px' }, // Full width on mobile, fixed on desktop
                    minWidth: { md: '280px' },
                    maxWidth: { xs: '100%', md: '350px' },
                    order: { xs: 2, md: 1 }, // Show below calculator on mobile
                    boxShadow: 3,
                    backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50'
                }}
            >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                        sx={{ 
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            fontWeight: 600,
                            color: 'primary.main',
                            mb: 2
                        }}
                    >
                        📊 How to Use the Graph
                    </Typography>
                    <List dense sx={{ p: 0 }}>
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                                primary="Click inside the graph to add points"
                                sx={{ 
                                    '& .MuiListItemText-primary': { 
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                        color: 'text.secondary'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                                primary={
                                    <span>
                                        Modify the equation{' '}
                                        <code style={{ 
                                            backgroundColor: theme.palette.action.hover,
                                            padding: '2px 4px',
                                            borderRadius: '4px',
                                            fontSize: '0.85em'
                                        }}>
                                            y = x²
                                        </code>{' '}
                                        in the left panel
                                    </span>
                                }
                                sx={{ 
                                    '& .MuiListItemText-primary': { 
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                        color: 'text.secondary'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                                primary="Use zoom buttons or pinch/scroll to zoom"
                                sx={{ 
                                    '& .MuiListItemText-primary': { 
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                        color: 'text.secondary'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                                primary="Drag the graph to move it around"
                                sx={{ 
                                    '& .MuiListItemText-primary': { 
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                        color: 'text.secondary'
                                    }
                                }}
                            />
                        </ListItem>
                        <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemText 
                                primary="Experiment with different functions!"
                                sx={{ 
                                    '& .MuiListItemText-primary': { 
                                        fontSize: { xs: '0.875rem', sm: '0.9rem' },
                                        color: 'text.secondary',
                                        fontWeight: 500
                                    }
                                }}
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>

            {/* Desmos Calculator */}
            <Box
                sx={{
                    flex: 1,
                    order: { xs: 1, md: 2 }, // Show above instructions on mobile
                    minHeight: { xs: '300px', sm: '400px', md: '500px' },
                    maxHeight: { xs: '400px', sm: '600px', md: '700px' },
                    width: '100%',
                    maxWidth: { xs: '100%', md: 'calc(100% - 350px)' }
                }}
            >
                <Box
                    id="calculator"
                    sx={{
                        width: '100%',
                        height: {
                            xs: '350px', // Mobile
                            sm: '450px', // Tablet
                            md: '500px', // Desktop small
                            lg: '600px'  // Desktop large
                        },
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2,
                        backgroundColor: 'background.paper',
                        '& .dcg-calculator-api-container': {
                            width: '100% !important',
                            height: '100% !important'
                        }
                    }}
                />
            </Box>
        </Box>
    );
}

export default DesmosGraph;