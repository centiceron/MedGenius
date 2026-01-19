export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string
          doctor_id: string
          duration_minutes: number | null
          id: string
          notes: string | null
          patient_id: string
          prescription: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          created_at?: string
          doctor_id: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id: string
          prescription?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          created_at?: string
          doctor_id?: string
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id?: string
          prescription?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      doctors: {
        Row: {
          available: boolean | null
          consultation_fee: number | null
          created_at: string
          id: string
          license_number: string
          rating: number | null
          specialty: string
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          available?: boolean | null
          consultation_fee?: number | null
          created_at?: string
          id?: string
          license_number: string
          rating?: number | null
          specialty: string
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          available?: boolean | null
          consultation_fee?: number | null
          created_at?: string
          id?: string
          license_number?: string
          rating?: number | null
          specialty?: string
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      health_records: {
        Row: {
          attachments: Json | null
          created_at: string
          description: string | null
          diagnosis: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string
          prescription: string | null
          record_date: string
          record_type: string
          title: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          prescription?: string | null
          record_date?: string
          record_type: string
          title: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          created_at?: string
          description?: string | null
          diagnosis?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          prescription?: string | null
          record_date?: string
          record_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      medicines: {
        Row: {
          category: string
          contraindications: string[] | null
          created_at: string
          description: string | null
          dosage: string
          form: string
          generic_name: string | null
          id: string
          name: string
          side_effects: string[] | null
          updated_at: string
        }
        Insert: {
          category: string
          contraindications?: string[] | null
          created_at?: string
          description?: string | null
          dosage: string
          form: string
          generic_name?: string | null
          id?: string
          name: string
          side_effects?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          contraindications?: string[] | null
          created_at?: string
          description?: string | null
          dosage?: string
          form?: string
          generic_name?: string | null
          id?: string
          name?: string
          side_effects?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          allergies: string[] | null
          blood_type: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          id: string
          medical_history: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          blood_type?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          blood_type?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pharmacies: {
        Row: {
          address: string
          created_at: string
          id: string
          latitude: number | null
          license_number: string
          longitude: number | null
          operating_hours: Json | null
          pharmacy_name: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          latitude?: number | null
          license_number: string
          longitude?: number | null
          operating_hours?: Json | null
          pharmacy_name: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          latitude?: number | null
          license_number?: string
          longitude?: number | null
          operating_hours?: Json | null
          pharmacy_name?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pharmacy_inventory: {
        Row: {
          available: boolean | null
          created_at: string
          expiry_date: string | null
          id: string
          last_updated: string
          medicine_id: string
          pharmacy_id: string
          price: number
          stock_quantity: number
        }
        Insert: {
          available?: boolean | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          last_updated?: string
          medicine_id: string
          pharmacy_id: string
          price: number
          stock_quantity?: number
        }
        Update: {
          available?: boolean | null
          created_at?: string
          expiry_date?: string | null
          id?: string
          last_updated?: string
          medicine_id?: string
          pharmacy_id?: string
          price?: number
          stock_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_inventory_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          created_at: string
          doctor_id: string
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medicine_id: string
          patient_id: string
          prescribed_date: string
          status: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medicine_id: string
          patient_id: string
          prescribed_date?: string
          status?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medicine_id?: string
          patient_id?: string
          prescribed_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_medicine_id_fkey"
            columns: ["medicine_id"]
            isOneToOne: false
            referencedRelation: "medicines"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "doctor" | "patient" | "pharmacy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "doctor", "patient", "pharmacy"],
    },
  },
} as const
