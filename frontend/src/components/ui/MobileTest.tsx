"use client";

import { useDeviceType, useOrientation, useTouchDevice, useBreakpoint } from './MobileOptimized';
import { Button } from './Button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './Card';

export function MobileTest() {
  const deviceType = useDeviceType();
  const orientation = useOrientation();
  const isTouchDevice = useTouchDevice();
  const breakpoint = useBreakpoint();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Mobile Responsiveness Test
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          This page demonstrates all the mobile-responsive features and utilities implemented across the CirclePay application.
        </p>
      </div>

      {/* Device Information Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Device Type</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1F1A46] capitalize">{deviceType}</p>
            <CardDescription>Current device classification</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Orientation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1F1A46] capitalize">{orientation}</p>
            <CardDescription>Screen orientation</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Touch Device</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1F1A46]">{isTouchDevice ? 'Yes' : 'No'}</p>
            <CardDescription>Touch capability</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle>Breakpoint</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1F1A46]">{breakpoint}</p>
            <CardDescription>Current breakpoint</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Responsive Button Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Buttons</CardTitle>
          <CardDescription>Buttons that adapt to different screen sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <Button size="sm" variant="primary">Small Button</Button>
            <Button size="md" variant="secondary">Medium Button</Button>
            <Button size="lg" variant="outline">Large Button</Button>
            <Button size="icon" variant="ghost">🔍</Button>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Grid Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Grid</CardTitle>
          <CardDescription>Grid layouts that adapt to screen size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 text-center">
                <p className="text-sm font-medium">Item {i + 1}</p>
                <p className="text-xs text-gray-500">Responsive grid item</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Responsive Text Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Typography</CardTitle>
          <CardDescription>Text sizes that scale with screen size</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Responsive Heading
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            This paragraph text scales from small on mobile to large on desktop screens.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Smaller text that also scales appropriately across different devices.
          </p>
        </CardContent>
      </Card>

      {/* Responsive Spacing Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Spacing</CardTitle>
          <CardDescription>Spacing utilities that adapt to screen size</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="p-3 sm:p-4 md:p-6 bg-blue-100 rounded-lg">
              <p className="text-sm sm:text-base">Responsive padding example</p>
            </div>
            <div className="m-2 sm:m-3 md:m-4 bg-green-100 rounded-lg p-3">
              <p className="text-sm sm:text-base">Responsive margin example</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile-First Utilities Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile-First Utilities</CardTitle>
          <CardDescription>Custom CSS utilities for responsive design</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid-responsive-2 gap-4">
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <p className="text-sm">Grid Item 1</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <p className="text-sm">Grid Item 2</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <p className="text-sm">Grid Item 3</p>
              </div>
            </div>
            
            <div className="flex-responsive-col gap-3 sm:gap-4">
              <Button variant="primary" size="sm">Button 1</Button>
              <Button variant="secondary" size="sm">Button 2</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Touch-Friendly Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Touch-Friendly Design</CardTitle>
          <CardDescription>Elements optimized for touch devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                variant="primary" 
                className="min-h-[44px] min-w-[44px] touch-manipulation"
              >
                Touch Target
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="min-h-[44px] min-w-[44px] touch-manipulation"
              >
                Large Touch
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Touch targets are at least 44x44px for better mobile usability
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 