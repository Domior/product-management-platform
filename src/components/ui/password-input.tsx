'use client';

import { forwardRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const disabled = props.value === '' || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} className={className} ref={ref} {...props} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(prev => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? <IoMdEyeOff className="h-4 w-4" aria-hidden="true" /> : <IoMdEye className="h-4 w-4" aria-hidden="true" />}
        <span className="sr-only">{showPassword ? 'Hide' : 'Show'}</span>
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
