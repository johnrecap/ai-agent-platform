import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Customer, Product, InvoiceData } from '../types';
import { customersData, productsData } from '../constants/mockData';

// --- CUSTOMERS SERVICE ---
export const CustomerService = {
  async getAll() {
    if (!isSupabaseConfigured()) return customersData; // Fallback to mock
    
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async create(customer: Partial<Customer>) {
    if (!isSupabaseConfigured()) {
        console.log("Mock Create Customer:", customer);
        return { ...customer, id: Math.random() };
    }

    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) throw error;
  }
};

// --- PRODUCTS SERVICE ---
export const ProductService = {
  async getAll() {
    if (!isSupabaseConfigured()) return productsData;

    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  },

  async create(product: Partial<Product>) {
    if (!isSupabaseConfigured()) return;

    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// --- AI AGENT SERVICE (Edge Functions) ---
export const AgentService = {
  async generateResponse(prompt: string, agentConfig: any) {
    if (!isSupabaseConfigured()) {
        // Mock latency
        await new Promise(r => setTimeout(r, 1000));
        return "This is a mock response because the backend is not connected. In production, this calls a Supabase Edge Function which securely queries Google Gemini.";
    }

    // Call Supabase Edge Function 'chat-completion'
    const { data, error } = await supabase.functions.invoke('chat-completion', {
      body: { prompt, config: agentConfig },
    });

    if (error) throw error;
    return data.response;
  }
};
