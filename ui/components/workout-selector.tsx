"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Heart, Zap, Clock } from "lucide-react";

interface WorkoutSelectorProps {
    onWorkoutSelect: (workoutType: string) => void;
    selectedWorkout?: string;
}

const WORKOUT_CATEGORIES = {
    cardio: {
        title: "Cardio Training",
        icon: <Heart className="h-4 w-4" />,
        color: "bg-red-500",
        workouts: [
            { id: "running", name: "Running", duration: "30 min", intensity: "Medium" },
            { id: "cycling", name: "Cycling", duration: "45 min", intensity: "Medium" },
            { id: "swimming", name: "Swimming", duration: "30 min", intensity: "Low" },
            { id: "hiit", name: "HIIT", duration: "20 min", intensity: "High" }
        ]
    },
    strength: {
        title: "Strength Training",
        icon: <Dumbbell className="h-4 w-4" />,
        color: "bg-blue-500",
        workouts: [
            { id: "upper_body", name: "Upper Body", duration: "45 min", intensity: "Medium" },
            { id: "lower_body", name: "Lower Body", duration: "45 min", intensity: "Medium" },
            { id: "full_body", name: "Full Body", duration: "60 min", intensity: "High" },
            { id: "core", name: "Core Focus", duration: "30 min", intensity: "Medium" }
        ]
    },
    flexibility: {
        title: "Flexibility & Recovery",
        icon: <Zap className="h-4 w-4" />,
        color: "bg-green-500",
        workouts: [
            { id: "yoga", name: "Yoga", duration: "45 min", intensity: "Low" },
            { id: "stretching", name: "Stretching", duration: "20 min", intensity: "Low" },
            { id: "pilates", name: "Pilates", duration: "45 min", intensity: "Medium" },
            { id: "mobility", name: "Mobility", duration: "30 min", intensity: "Low" }
        ]
    }
};

export function WorkoutSelector({ onWorkoutSelect, selectedWorkout }: WorkoutSelectorProps) {
    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
            case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto glass-effect shadow-xl border animate-bounce-in">
            <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold text-card-foreground">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    Select Your Workout
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                    Choose a workout type that fits your goals and schedule
                </p>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-6">
                    {Object.entries(WORKOUT_CATEGORIES).map(([key, category]) => (
                        <div key={key} className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                                    {category.icon}
                                </div>
                                <h4 className="font-semibold text-card-foreground">{category.title}</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {category.workouts.map((workout, index) => (
                                    <button
                                        key={workout.id}
                                        className={`p-4 rounded-xl border transition-all duration-200 text-left card-hover ${
                                            selectedWorkout === workout.id
                                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                                : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                                        }`}
                                        onClick={() => onWorkoutSelect(workout.id)}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h5 className="font-medium text-card-foreground">{workout.name}</h5>
                                            {selectedWorkout === workout.id && (
                                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs">
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {workout.duration}
                                            </Badge>
                                            <Badge className={getIntensityColor(workout.intensity)}>
                                                {workout.intensity}
                                            </Badge>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedWorkout && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-xl text-center animate-slide-up">
                        <p className="font-medium text-primary">
                            ✨ Selected: {selectedWorkout.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Great choice! This workout will be added to your plan.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}