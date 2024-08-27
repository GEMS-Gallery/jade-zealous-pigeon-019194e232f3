import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

interface BlogCreationStep {
  id: number;
  title: string;
  description: string;
  prompt: string;
}

const App: React.FC = () => {
  const [steps, setSteps] = useState<BlogCreationStep[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSteps = async () => {
      const result = await backend.getBlogCreationSteps();
      setSteps(result);
    };
    fetchSteps();
  }, []);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GEM's Learn
          </Typography>
          <Button color="inherit">Start Building</Button>
          <Button color="inherit">Showcase</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Creating a Blog Website with GEMs
        </Typography>
        <Typography variant="body1" paragraph>
          Follow these steps to create your own blog website using GEMs. Each step includes a prompt you can use to get started.
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} key={step.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {step.description}
                  </Typography>
                  <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, position: 'relative' }}>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                      {step.prompt}
                    </Typography>
                    <Button
                      startIcon={copiedIndex === index ? <Check /> : <ContentCopy />}
                      onClick={() => copyToClipboard(step.prompt, index)}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      {copiedIndex === index ? 'Copied!' : 'Copy'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © 2024 GEM's Learn. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default App;
