import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { cep } = body;

  if (!cep) {
    return new Response(JSON.stringify({ error: 'CEP is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Mock calculation logic
  // In a real scenario, this would call a carrier API (Correios, Jadlog, etc.)
  
  const mockShippingOptions = [
    {
      name: 'Econômico',
      price: 15.90,
      days: 5,
    },
    {
      name: 'Expresso',
      price: 29.90,
      days: 2,
    }
  ];

  // Specific logic for Ouro Fino / PR
  if (cep.startsWith('80') || cep.startsWith('81') || cep.startsWith('82') || cep.startsWith('83')) {
      // Curitiba and region - cheaper
      mockShippingOptions[0].price = 9.90;
      mockShippingOptions[0].days = 3;
      mockShippingOptions[1].price = 19.90;
      mockShippingOptions[1].days = 1;
  }

  return new Response(JSON.stringify(mockShippingOptions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
