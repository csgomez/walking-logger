import { useForm } from 'react-hook-form';
import { createWalkingStat } from '../../services/api';
import toast from 'react-hot-toast';

export type WalkingFormData = {
  duration: string;
  distance?: string;
  calories?: string;
  note?: string;
};

const WalkingForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalkingFormData>();

  // const isNum = (numString: string) => !isNaN(Number(numString));
  // const isInt = (numString: string) => Number.isInteger(Number(numString));

  const isInt = (numString: string) => {
    const pattern = /^-?\d+$/;
    return pattern.test(numString);
  };

  const isFloat = (numString: string) => {
    const pattern = /^\d+\.\d+$/;
    return pattern.test(numString);
  };

  // Must be in the form of 'hh:mm' where hh and mm are integer numbers
  const isDurationValid = (duration: string) => {
    const [hh, mm] = duration.split(':');
    return isInt(hh) && isInt(mm);
  };

  // Must be a decimal number (ie, contain a decimal point)
  const isDistanceValid = (distance?: string) => {
    if (!distance) return true;

    return isFloat(distance);
  };

  // Just has to be a valid float or int
  const isCaloriesValid = (calories?: string) => {
    if (!calories) return true;

    return isFloat(calories) || isInt(calories);
  };

  const onSubmit = async (formData: WalkingFormData) => {
    try {
      const newWalkingStat = {
        ...formData,
        date: new Date().toISOString(),
      };

      await createWalkingStat(newWalkingStat);
      toast.success('Stat successfully sent!');
      reset();
    } catch (err) {
      console.error('Error posting walking stat data.', err);
    }
  };

  return (
    <form className="walking-form" onSubmit={handleSubmit(onSubmit)}>
      <h4>Walking stats for today</h4>
      <div className="mb-3">
        <label htmlFor="walkingFormDuration" className="form-label">
          Duration
        </label>
        <input
          type="text"
          className="form-control"
          id="walkingFormDuration"
          autoComplete="off"
          maxLength={5}
          {...register('duration', {
            required: true,
            validate: isDurationValid,
          })}
        />
        {/* <div id="durationHelp" className="form-text">
          How long did you walk for?
        </div> */}
        {errors.duration && <p>Input is invalid. Please fix!</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="walkingFormDistance" className="form-label">
          Distance
        </label>
        <input
          type="text"
          className="form-control"
          id="walkingFormDistance"
          autoComplete="off"
          maxLength={5}
          {...register('distance', { validate: isDistanceValid })}
        />
        {errors.distance && <p>Input is invalid. Please fix!</p>}
        {/* <div id="distanceHelp" className="form-text">
          How far did you walk in miles?
        </div> */}
      </div>

      <div className="mb-3">
        <label htmlFor="walkingFormCalories" className="form-label">
          Calories
        </label>
        <input
          type="text"
          id="walkingFormCalories"
          className="form-control"
          autoComplete="off"
          {...register('calories', { validate: isCaloriesValid })}
        />
        {errors.calories && <p>Input is invalid. Please fix!</p>}
        {/* <div id="caloriesHelp" className="form-text">
          How many calories did you burn (estimate)?
        </div> */}
      </div>

      <div className="mb-3">
        <label htmlFor="walkingFormNote" className="form-label">
          Note
        </label>
        <textarea
          id="walkingFormNote"
          className="form-control"
          autoComplete="off"
          {...register('note')}
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default WalkingForm;
