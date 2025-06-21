"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"

interface ProfileData {
  id: string
  email: string
  first_name: string
  last_name: string
  onboarding_completed: boolean
  onboarding_data: any
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error("Error fetching profile:", error)
          setError("Failed to load profile data")
        } else {
          setProfileData(data)
        }
      } catch (err) {
        console.error("Profile fetch error:", err)
        setError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/upload" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        {error && (
          <Card className="p-6 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {profileData && (
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{profileData.first_name} {profileData.last_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Onboarding Completed</label>
                  <p className="text-gray-900">{profileData.onboarding_completed ? "Yes" : "No"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-900">{new Date(profileData.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* Onboarding Data */}
            {profileData.onboarding_data && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Onboarding Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Allergies</label>
                    <p className="text-gray-900">
                      {profileData.onboarding_data.allergies?.length > 0 
                        ? profileData.onboarding_data.allergies.join(", ") 
                        : "None"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Dietary Restrictions</label>
                    <p className="text-gray-900">
                      {profileData.onboarding_data.dietaryRestrictions?.length > 0 
                        ? profileData.onboarding_data.dietaryRestrictions.join(", ") 
                        : "None"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Household Size</label>
                    <p className="text-gray-900">{profileData.onboarding_data.householdSize} people</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Has Children</label>
                    <p className="text-gray-900">{profileData.onboarding_data.hasChildren ? "Yes" : "No"}</p>
                  </div>
                  {profileData.onboarding_data.hasChildren && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Children Ages</label>
                      <p className="text-gray-900">{profileData.onboarding_data.childrenAges}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Food Preferences</label>
                    <p className="text-gray-900">
                      {profileData.onboarding_data.foodPreferences?.length > 0 
                        ? profileData.onboarding_data.foodPreferences.join(", ") 
                        : "None specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cuisine Preferences</label>
                    <p className="text-gray-900">
                      {profileData.onboarding_data.cuisinePreferences?.length > 0 
                        ? profileData.onboarding_data.cuisinePreferences.join(", ") 
                        : "None specified"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Spice Tolerance</label>
                    <p className="text-gray-900">{profileData.onboarding_data.spiceTolerance}/5</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Max Spending</label>
                    <p className="text-gray-900">${profileData.onboarding_data.maxSpending}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Shopping Frequency</label>
                    <p className="text-gray-900">{profileData.onboarding_data.shoppingFrequency}</p>
                  </div>
                  {profileData.onboarding_data.avoidIngredients && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Ingredients to Avoid</label>
                      <p className="text-gray-900">{profileData.onboarding_data.avoidIngredients}</p>
                    </div>
                  )}
                  {profileData.onboarding_data.specialDietary && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Special Dietary Notes</label>
                      <p className="text-gray-900">{profileData.onboarding_data.specialDietary}</p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Raw Data for Debugging */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Raw Data (Debug)</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(profileData, null, 2)}
              </pre>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
} 