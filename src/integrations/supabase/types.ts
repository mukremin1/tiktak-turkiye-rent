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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          car_id: string
          created_at: string | null
          driver_history_checked: boolean | null
          driver_risk_level: string | null
          end_time: string
          id: string
          payment_status: string | null
          rental_type: string
          start_time: string
          total_price: number
          traffic_delay_minutes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          car_id: string
          created_at?: string | null
          driver_history_checked?: boolean | null
          driver_risk_level?: string | null
          end_time: string
          id?: string
          payment_status?: string | null
          rental_type: string
          start_time: string
          total_price: number
          traffic_delay_minutes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          car_id?: string
          created_at?: string | null
          driver_history_checked?: boolean | null
          driver_risk_level?: string | null
          end_time?: string
          id?: string
          payment_status?: string | null
          rental_type?: string
          start_time?: string
          total_price?: number
          traffic_delay_minutes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          available: boolean | null
          city: string | null
          created_at: string | null
          description: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id: string
          image_url: string | null
          km_packages: Json | null
          latitude: number | null
          location: string
          lock_status: string | null
          longitude: number | null
          name: string
          owner_id: string
          plate_number: string | null
          price_per_day: number
          price_per_hour: number
          price_per_km: number | null
          price_per_minute: number
          seats: number
          transmission: Database["public"]["Enums"]["transmission_type"]
          type: Database["public"]["Enums"]["car_type"]
          updated_at: string | null
          year: number | null
        }
        Insert: {
          available?: boolean | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          fuel_type: Database["public"]["Enums"]["fuel_type"]
          id?: string
          image_url?: string | null
          km_packages?: Json | null
          latitude?: number | null
          location: string
          lock_status?: string | null
          longitude?: number | null
          name: string
          owner_id: string
          plate_number?: string | null
          price_per_day: number
          price_per_hour: number
          price_per_km?: number | null
          price_per_minute: number
          seats: number
          transmission: Database["public"]["Enums"]["transmission_type"]
          type: Database["public"]["Enums"]["car_type"]
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          available?: boolean | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          fuel_type?: Database["public"]["Enums"]["fuel_type"]
          id?: string
          image_url?: string | null
          km_packages?: Json | null
          latitude?: number | null
          location?: string
          lock_status?: string | null
          longitude?: number | null
          name?: string
          owner_id?: string
          plate_number?: string | null
          price_per_day?: number
          price_per_hour?: number
          price_per_km?: number | null
          price_per_minute?: number
          seats?: number
          transmission?: Database["public"]["Enums"]["transmission_type"]
          type?: Database["public"]["Enums"]["car_type"]
          updated_at?: string | null
          year?: number | null
        }
        Relationships: []
      }
      driver_history: {
        Row: {
          created_at: string
          id: string
          last_violation_date: string | null
          license_number: string
          notes: string | null
          penalty_points: number
          total_accidents: number
          traffic_violations: number
          updated_at: string
          user_id: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_violation_date?: string | null
          license_number: string
          notes?: string | null
          penalty_points?: number
          total_accidents?: number
          traffic_violations?: number
          updated_at?: string
          user_id: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_violation_date?: string | null
          license_number?: string
          notes?: string | null
          penalty_points?: number
          total_accidents?: number
          traffic_violations?: number
          updated_at?: string
          user_id?: string
          verification_status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          discount_percentage: number
          end_date: string
          id: string
          start_date: string
          status: string
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          discount_percentage?: number
          end_date: string
          id?: string
          start_date?: string
          status?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          discount_percentage?: number
          end_date?: string
          id?: string
          start_date?: string
          status?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_actions: {
        Row: {
          action_type: string
          car_id: string
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          car_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          car_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_actions_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "car_owner"
      car_type: "compact" | "sedan" | "suv"
      fuel_type: "Benzin" | "Dizel" | "Elektrik" | "Hibrit"
      subscription_tier: "basic" | "premium" | "vip"
      transmission_type: "Manuel" | "Otomatik"
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
      app_role: ["user", "car_owner"],
      car_type: ["compact", "sedan", "suv"],
      fuel_type: ["Benzin", "Dizel", "Elektrik", "Hibrit"],
      subscription_tier: ["basic", "premium", "vip"],
      transmission_type: ["Manuel", "Otomatik"],
    },
  },
} as const
