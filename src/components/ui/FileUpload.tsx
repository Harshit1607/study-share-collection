
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, FileText, File } from "lucide-react";

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

const FileUpload = ({
  onFileChange,
  accept = ".pdf,.doc,.docx,.ppt,.pptx",
  maxSizeMB = 10,
  className,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size should not exceed ${maxSizeMB}MB`);
      return;
    }
    
    // Check file type
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = accept.split(",").map(type => 
      type.startsWith(".") ? type.substring(1) : type
    );
    
    if (fileExtension && !acceptedTypes.includes(fileExtension)) {
      setError(`Only ${accept} files are allowed`);
      return;
    }
    
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const selectedFile = e.dataTransfer.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
    setError(null);
    
    // Reset the input value to allow re-uploading the same file
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (file.type.includes("word")) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (file.type.includes("presentation")) {
      return <FileText className="h-5 w-5 text-orange-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
        accept={accept}
        className="hidden"
      />
      
      {!file ? (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50",
            className
          )}
        >
          <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Upload your file</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-xs">
            Drag and drop or click to browse.
            <br />
            Supported formats: {accept}
          </p>
          <Button size="sm" variant="secondary">
            Select File
          </Button>
        </div>
      ) : (
        <div className="bg-secondary/50 border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getFileIcon()}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
