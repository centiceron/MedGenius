import React, { useState } from "react";
import Papa from "papaparse";
import { supabase } from "@/lib/supabase";

import {
  Pill,
  MapPin,
  Package,
  Search,
  Plus,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/Header";

const nearbyPharmacies = [
  {
    id: 1,
    name: "Central Pharmacy",
    distance: "0.5 km",
    stock: 1200,
    available: 850,
  },
  {
    id: 2,
    name: "HealthMart Plus",
    distance: "1.2 km",
    stock: 900,
    available: 750,
  },
  {
    id: 3,
    name: "MediCare Corner",
    distance: "2.1 km",
    stock: 1500,
    available: 1100,
  },
  {
    id: 4,
    name: "Quick Relief Pharmacy",
    distance: "2.8 km",
    stock: 800,
    available: 600,
  },
];

const PharmacyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState<any[]>([]);

  // ✅ CSV Upload
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data.map((row: any, index: number) => ({
          id: index + 1,
          name: row.drugName,
          manufacturer: row.manufacturer,
          image: row.image,
          description: row.description,
          consumeType: row.consumeType,
          expiryDate: row.expirydate || row.expiryDate,
          price: Number(row.price) || 0,
          sideEffects: row.sideEffects,
          disclaimer: row.disclaimer,
          category: row.category,
          stock: Number(row.countInStock) || 0,
          available: true,
          lastUpdated: "Just now",
        }));
        setInventory(parsedData);
      },
    });
  };

  const toggleAvailability = (id: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const filteredInventory = inventory.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Upload to Supabase
  const handleSubmitToSupabase = async () => {
    if (inventory.length === 0) {
      alert("No data to upload!");
      return;
    }

    const cleanData = inventory.map(
      ({ id, available, lastUpdated, ...rest }) => ({
        drugName: rest.name,
        manufacturer: rest.manufacturer,
        image: rest.image,
        description: rest.description,
        consumeType: rest.consumeType,
        expirydate:
          rest.expiryDate && rest.expiryDate !== "N/A" ? rest.expiryDate : null,
        price: rest.price,
        sideEffects: rest.sideEffects,
        disclaimer: rest.disclaimer,
        category: rest.category,
        countInStock: rest.stock,
      })
    );

    const { data, error } = await supabase
      .from("medicine-uploader")
      .insert(cleanData);

    if (error) {
      console.error("Upload error:", error);
      alert("Failed to upload data ❌");
    } else {
      console.log("Uploaded:", data);
      alert("Data uploaded to Supabase ✅");
    }
  };

  const stats = [
    {
      title: "Total Medicines",
      value: inventory.length.toString(),
      icon: Package,
      color: "primary",
    },
    {
      title: "Available Stock",
      value: inventory.reduce((sum, i) => sum + i.stock, 0).toString(),
      icon: CheckCircle,
      color: "success",
    },
    {
      title: "Low Stock Items",
      value: inventory
        .filter((i) => i.stock < 20 && i.stock > 0)
        .length.toString(),
      icon: AlertCircle,
      color: "warning",
    },
    { title: "Daily Orders", value: "145", icon: TrendingUp, color: "accent" },
  ];

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (stock < 20)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-background to-muted/30'>
      <Header />

      <div className='container max-w-screen-2xl mx-auto p-6'>
        {/* Page Header */}
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-foreground mb-2'>
              Pharmacy Dashboard
            </h1>
            <p className='text-muted-foreground'>
              Manage inventory and track medicine availability
            </p>
          </div>

          {/* Upload + Actions */}
          <div className='flex gap-3'>
            <Input
              type='file'
              accept='.csv'
              onChange={handleCSVUpload}
              className='cursor-pointer'
            />
            <Button variant='medical' className='flex items-center gap-2'>
              <Plus className='h-4 w-4' /> Add Medicine
            </Button>
            <Button
              variant='default'
              className='flex items-center gap-2'
              onClick={handleSubmitToSupabase}
            >
              <CheckCircle className='h-4 w-4' /> Submit to Supabase
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat) => (
            <Card key={stat.title} className='shadow-card border-0'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium text-muted-foreground'>
                      {stat.title}
                    </p>
                    <p className='text-2xl font-bold text-foreground'>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid lg:grid-cols-2 gap-8 mb-8'>
          {/* ✅ Inventory */}
          <Card>
            <CardHeader>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search medicines...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4 max-h-96 overflow-y-auto'>
                {filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item.stock);
                  return (
                    <div
                      key={item.id}
                      className='flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50'
                    >
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h4 className='font-semibold text-foreground'>
                            {item.name}
                          </h4>
                          <Badge variant={stockStatus.variant}>
                            {stockStatus.label}
                          </Badge>
                        </div>
                        <p className='text-sm text-muted-foreground mb-1'>
                          {item.category} • ₹{item.price}
                        </p>
                        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                          <Package className='h-3 w-3' />
                          Stock: {item.stock} units
                          <Clock className='h-3 w-3 ml-2' />
                          Updated: {item.lastUpdated}
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='text-right'>
                          <div className='text-xs text-muted-foreground mb-1'>
                            Available
                          </div>
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => toggleAvailability(item.id)}
                          />
                        </div>
                        <Button variant='outline' size='sm'>
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* ✅ Nearby Pharmacies */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MapPin className='h-6 w-6 text-primary' />
                Nearby Pharmacy Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='bg-muted/30 rounded-lg h-48 mb-4 flex items-center justify-center border-2 border-dashed border-border'>
                <p className='text-muted-foreground text-center'>
                  Interactive map coming soon
                </p>
              </div>
              <div className='space-y-3'>
                {nearbyPharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className='flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50'
                  >
                    <div>
                      <div className='font-medium text-foreground'>
                        {pharmacy.name}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        <MapPin className='h-3 w-3 inline mr-1' />
                        {pharmacy.distance}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm font-medium text-foreground'>
                        {pharmacy.available}/{pharmacy.stock}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Available/Total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Updates + Quick Actions can also be added here like in your new design */}
      </div>
    </div>
  );
};

export default PharmacyPage;
