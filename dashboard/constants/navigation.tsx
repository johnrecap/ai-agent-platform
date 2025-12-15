import React from 'react';
import { 
  LayoutDashboard, CreditCard, Users, MessageSquare, 
  Package, FileText, BarChart2, Zap, Settings, 
  ShieldCheck, HelpCircle, Bot
} from 'lucide-react';
import { MenuSection } from '../types';

export const SIDEBAR_MENU: MenuSection[] = [
  {
    category: "GENERAL",
    items: [
      { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
      { icon: <CreditCard size={20} />, label: "Payment", path: "/payment" },
      { icon: <Users size={20} />, label: "Customers", path: "/customers" },
      { icon: <MessageSquare size={20} />, label: "Message", path: "/messages", badge: 8 },
    ]
  },
  {
    category: "TOOLS",
    items: [
      { icon: <Package size={20} />, label: "Product", path: "/products" },
      { icon: <FileText size={20} />, label: "Invoice", path: "/invoices" },
      { icon: <Bot size={20} />, label: "Agent Maker", path: "/agent-maker" },
      { icon: <BarChart2 size={20} />, label: "Analytics", path: "/analytics" },
      { icon: <Zap size={20} />, label: "Automation", path: "/automation", badge: "BETA", role: 'admin' },
    ]
  },
  {
    category: "SUPPORT",
    items: [
      { icon: <Settings size={20} />, label: "Settings", path: "/settings", role: 'admin' },
      { icon: <ShieldCheck size={20} />, label: "Security", path: "/security", role: 'admin' },
      { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
    ]
  }
];