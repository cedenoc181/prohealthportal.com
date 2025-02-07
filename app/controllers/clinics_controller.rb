class ClinicsController < ApplicationController

before_action :find_clinic, only: %i[ show update destroy ]

skip_before_action :is_admin?, only: %i[ show index ]

def index
    @clinics = Clinic.all
    render json: @clinics, each_serializer: ClinicSerializer, status: :ok
end 

def show
    render json: @clinic, serializer: ClinicSerializer, status: :ok
end 


# clinics should store all the orders for inventory

def create 
    @clinic = Clinic.new(clinic_params)
    if @clinic.save
        render json: {clinic: @clinic, message: "clinic has been successfully created"}, status: :created
    else 
        render json: {clinic: @clinic.errors.full_messages, message: "clinic was unable to be created, please check params are met."}, status: :unprocessable_entity
    end
end 


def update 
    if @clinic.update(clinic_params)
        render json: {clinic: @clinic, message: "clinic has been successfully updated"}, status: :ok
    else
        render json: {clinic: @clinic.errors.full_messages, message: "failed to update #{@clinic.clinic_location_name}, please check params have been met"}, status: :unprocessable_entity
    end
end 


def destroy

    if @clinic.destroy
        render json: {message: "#{@clinic.clinic_location_name} was successfully deleted"}, status: :ok
        else
         render json: {message: "failed to delete #{@clinic.clinic_location_name}"}
    end

end




private 

def find_clinic 
    @clinic = Clinic.find(param[:id])
end 

def clinic_params 
    params.permit(:clinic_location_name, :clinic_location_address, :clinic_phone_number, :clinical_director)
end 


end
